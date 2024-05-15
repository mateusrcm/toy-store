import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'ts-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NzTypographyModule,
    NzButtonModule,
    NzInputModule,
    NzSpaceModule,
    NzGridModule,
    NzFormModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent {
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private user: UserService
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
