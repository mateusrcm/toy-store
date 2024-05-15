import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { Profile } from '../../shared/models/user.type';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'ts-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzTypographyModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    NzSpaceModule,
    NzGridModule,
    NzFormModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent {
  validateForm: FormGroup<{
    firstName: FormControl<string | null>;
    lastName: FormControl<string | null>;
    birthDate: FormControl<Date | null>;
    picture: FormControl<string | null>;
    mail: FormControl<string | null>;
    userName: FormControl<string | null>;
    password: FormControl<string | null>;
    profile: FormControl<Profile | null>;
  }> = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
    picture: ['', [Validators.required]],
    mail: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    profile: [Profile.Client, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.user.login(form.userName!, form.password!).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
