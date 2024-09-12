import { NgIf,NgClass} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../services/user-register.service';
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, LogInComponent, SignUpComponent],
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
