import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  private usernameSubject = new BehaviorSubject<string | null>(
    null
  );

  estado$ = this.usernameSubject.asObservable();

  constructor() {
    this.checkUsername();
  }

  checkUsername() {
    this.usernameSubject.next(this.getUsername());
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
