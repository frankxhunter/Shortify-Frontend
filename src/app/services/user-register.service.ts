import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URLS } from '../api-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/User.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  private httpClient = inject(HttpClient);

  private usernameSubject = new BehaviorSubject<string | null>(null);
  private logInSubject = new BehaviorSubject<boolean>(false);
  private signUpSubject = new BehaviorSubject<boolean>(false);

  usernameState$ = this.usernameSubject.asObservable();
  logInState$ = this.logInSubject.asObservable();
  signUpState$ = this.signUpSubject.asObservable();

  plataformBrower = inject(PLATFORM_ID);

  checkUsername() {
    this.fetchCheckUser().subscribe((user) => {
      if (user?.username) {
        this.setUserName(user.username);
      }
    });
  }

  setUserName(username: string) {
    this.usernameSubject.next(username);
  }

  checkIsAnyRegisterIsActivated() {
    return this.logInSubject.getValue() || this.signUpSubject.getValue();
  }

  changeLogInState(newState: boolean) {
    this.logInSubject.next(newState);
    this.signUpSubject.next(false);
  }
  changeSignUpState(newState: boolean) {
    this.signUpSubject.next(newState);
    this.logInSubject.next(false);
  }

  fetchLogIn(dataUser: any) {
    let params = new HttpParams();
    params = params.set('email', dataUser.email);
    params = params.set('password', dataUser.password);

    return this.httpClient.post(API_URLS.logInURL, params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
      responseType: 'json',
    });
  }
  fetchSignUp(dataUser: any) {
    let params = new HttpParams();
    params = params.set('username', dataUser.username);
    params = params.set('email', dataUser.email);
    params = params.set('password', dataUser.password);

    return this.httpClient.post(API_URLS.signUpURL, params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
      responseType: 'json',
    });
  }

  private fetchCheckUser() {
    return this.httpClient.get<User>(API_URLS.logInURL, {
      withCredentials: true,
      responseType: 'json',
    });
  }
}
