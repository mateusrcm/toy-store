import { Injectable } from '@angular/core';
import { UserHttpService } from './user.http.service';
import { Observable, map, tap } from 'rxjs';
import { Profile, User } from '../models/user.type';
import { SessionStorage } from '../helpers/storage';

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

  constructor(private userHttp: UserHttpService) {}

  login(username: string, password: string): Observable<User> {
    return this.userHttp.login(username, password).pipe(
      map((result: User) => {
        result.password = null;

        return result;
      }),
      tap((result: User) => {
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.birthDate = result.birthDate;
        this.picture = result.picture;
        this.mail = result.mail;
        this.userName = result.userName;
        this.profile = result.profile;

        this.isLoggedIn = true;
      })
    );
  }

  createAccount(username: string, password: string): void {}

  logout(): void {
    this.isLoggedIn = false;
    this.firstName = null!;
    this.lastName = null!;
    this.birthDate = null!;
    this.picture = null!;
    this.mail = null!;
    this.userName = null!;
    this.profile = null!;
  }
}
