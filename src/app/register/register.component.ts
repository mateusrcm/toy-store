import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Profile, User } from '../../shared/models/user.type';
import { UserService } from '../../shared/services/user.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ts-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzDividerModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    NzSpaceModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent {
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  destroyRef = inject(DestroyRef);

  //#region Register Form
  registerForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    birthDate: FormControl<Date | null>;
    picture: FormControl<string>;
    mail: FormControl<string>;
    userName: FormControl<string>;
    passwords: FormGroup<{
      password: FormControl<string>;
      confirmPassword: FormControl<string>;
    }>;
    profile: FormControl<Profile>;
  }> = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: this.fb.control<Date | null>(null, [Validators.required]),
    picture: [''],
    // TODO: Prevent repeated values in DB
    mail: ['', [Validators.required, Validators.email]],
    // TODO: Prevent repeated values in DB
    userName: ['', [Validators.required]],
    passwords: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            /**
             ** Password validator
             * Decided to disable for faster testing and interaction
             * Validators.pattern(
             *   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
             * ),
             */
          ],
        ],
        confirmPassword: ['', [Validators.required, parentHasErrors]],
      },
      { validators: [confirmPassword] },
    ),
    profile: [Profile.Client, [Validators.required]],
  });
  //#endregion

  constructor(
    private fb: NonNullableFormBuilder,
    private user: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => {
        this.updateTreeValidity(this.registerForm);
      });
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      const form = this.registerForm.value;

      const userObj: User = {
        firstName: form.firstName!,
        lastName: form.lastName!,
        birthDate: form.birthDate!,
        picture: form.picture!,
        mail: form.mail!,
        userName: form.userName!,
        password: form.passwords!.password!,
        profile: form.profile!,
      };

      this.user.createAccount(userObj, true).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.updateTreeValidity(this.registerForm);
    }
  }

  updateTreeValidity(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];

      if (abstractControl instanceof FormGroup) {
        this.updateTreeValidity(abstractControl);
      } else {
        abstractControl.markAsDirty();
        abstractControl.updateValueAndValidity();
      }
    });
  }
}

function parentHasErrors(c: AbstractControl): ValidationErrors | null {
  if (c.parent?.errors) {
    return { ...c.parent?.errors };
  }

  return null;
}

function confirmPassword(control: AbstractControl): ValidationErrors | null {
  if (
    control.get('password')?.value !== control.get('confirmPassword')?.value
  ) {
    return { passwordMismatch: true };
  }

  return null;
}
