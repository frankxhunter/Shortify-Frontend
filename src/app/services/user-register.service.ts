import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  private usernameSubject = new BehaviorSubject<string | null>(
    null
  );
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

  changeLogInState(newState: boolean){
    this.logInSubject.next(newState);
    this.signUpSubject.next(false);
  }
  changeSignUpState(newState: boolean){
    this.signUpSubject.next(newState);
    this.logInSubject.next(false);
  }

  private getUsername() {
    return this.isLocalStorageAvailable()? localStorage.getItem('username'): null;
  }

  private isLocalStorageAvailable(){
    try{
      const test = "test"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true;
    }catch{
      return false;
    }
  }
}
