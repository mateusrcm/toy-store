import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../environments/environment';

import { Profile, User } from '../models/user.type';
import { profileRestriction } from '../helpers/security';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const url = `${BASE_URL}/users?userName=${username}&password=${password}`;

    return this.http.get<User[]>(url).pipe(
      map((users: User[]) => {
        return users[0];
      })
    );
  }

  createAccount(user: User): Observable<User> {
    const url = `${BASE_URL}/users`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    return this.http.post<User>(url, user);
  }
}
