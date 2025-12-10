import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterService } from '../../../services/user-register.service';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LogInComponent } from "./log-in/log-in.component";

@Component({
    selector: 'app-register-user',
    imports: [ReactiveFormsModule, SignUpComponent, LogInComponent],
    templateUrl: './register-user.component.html',
    styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  userRegisterService = inject(UserRegisterService)

  logInState = false
  signUpState = false

  ngOnInit(): void {
    this.userRegisterService.logInState$.subscribe((newState)=>{
      this.logInState = newState;
    })
    this.userRegisterService.signUpState$.subscribe((newState)=>{
      this.signUpState = newState
    })
  }

  closeAction(){
    this.userRegisterService.changeLogInState(false)
    this.userRegisterService.changeSignUpState(false)
  }



}
