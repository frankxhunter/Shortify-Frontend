import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URLS } from '../api-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/User.interface';

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
    this.fetchCheckUser().subscribe((email) => {
      if (email) {
        this.setUserName(email);
        this.changeSignUpState(false);
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
    return this.httpClient.post(API_URLS.logInURL, {
      email: dataUser.email,
      password: dataUser.password
    },{
        withCredentials: true,
        responseType: 'text'
    }
    );
  }
  fetchSignUp(dataUser: any) {
    return this.httpClient.post<User>(API_URLS.signUpURL, {
      email: dataUser.email,
      password: dataUser.password
    }, {
      withCredentials: true,
      responseType: 'json',
    });
  }

  private fetchCheckUser() {
    return this.httpClient.get(API_URLS.logInURL, {
      withCredentials: true,
      responseType: 'text' as const,
    });
  }
}
