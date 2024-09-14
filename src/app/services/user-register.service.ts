import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URLS } from '../api-urls';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  constructor() {
    this.checkUsername();
  }

  checkUsername() {
    this.usernameSubject.next(this.getUsername());
  }

  setUserName(username: string){
    if(this.isLocalStorageAvailable()){
      localStorage.setItem('username', username)
      this.checkUsername();
    }
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
      responseType: 'json'
    });
  }
  fetchSignUp(dataUser: any) {
    let params = new HttpParams();
    params = params.set('username', dataUser.username);
    params = params.set('email', dataUser.email);
    params = params.set('password', dataUser.password);

    return this.httpClient.post(API_URLS.signUpURL, params, {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      responseType: 'json'
    });
  }

  private getUsername() {
    return this.isLocalStorageAvailable()
      ? localStorage.getItem('username')
      : null;
  }

  private isLocalStorageAvailable() {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
