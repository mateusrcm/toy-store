import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  profile!: string;
  firstName!: string;
  lastName!: string;

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  login(mail: string, password: string): void {}

  createAccount(mail: string, password: string): void {}

  logout(): void {
    this.isLoggedIn = false;
    this.profile = null!;
  }
}
