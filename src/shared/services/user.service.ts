import { Injectable } from '@angular/core';
import { UserHttpService } from './user.http.service';
import { Observable, map, tap } from 'rxjs';
import { Profile, User } from '../models/user.type';
import { SessionStorage } from '../helpers/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;

  //#region USER PROPS
  firstName!: string;
  lastName!: string;
  birthDate!: Date;
  picture!: string;
  mail!: string;
  userName!: string;
  @SessionStorage('profile') profile!: Profile;
  //#endregion

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(private userHttp: UserHttpService, private router: Router) {}

  login(username: string, password: string): Observable<User> {
    return this.userHttp.login(username, password).pipe(
      tap((result: User) => {
        this.assignProps(result);
      })
    );
  }

  createAccount(user: User, shouldLogin: boolean = false): Observable<User> {
    return this.userHttp.createAccount(user).pipe(
      tap((result: User) => {
        if (shouldLogin) this.assignProps(result);
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.firstName = null!;
    this.lastName = null!;
    this.birthDate = null!;
    this.picture = null!;
    this.mail = null!;
    this.userName = null!;
    this.profile = null!;

    this.router.navigate(['/']);
  }

  private assignProps(user: User): void {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthDate = user.birthDate;
    this.picture = user.picture;
    this.mail = user.mail;
    this.userName = user.userName;
    this.profile = user.profile;

    this.isLoggedIn = true;
  }
}
