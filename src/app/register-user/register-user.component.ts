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
  passwordVisibility = false;

  isClickBtnSend = false;

  userRegisterService = inject(UserRegisterService)

  userForm: FormGroup;

  constructor(_form:FormBuilder){
    this.userForm = _form.group({
      username: ["", [Validators.required, Validators.pattern(/^\w[\w.]{0,28}\w$/)]],
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z\d-_]+@[a-zA-Z0-9.]+.[a-z]+$/)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/)]],
      
    })
  }

  hasError(controlName: string, typeError: string){
    return (this.userForm.get(controlName)?.getError(typeError) && (this.userForm.get(controlName)?.touched || this.isClickBtnSend));
  }
  hasAnyError(controlName: string){
    return this.userForm.get(controlName)?.errors && (this.userForm.get(controlName)?.touched || this.isClickBtnSend)
  }

  sendData(){
    this.isClickBtnSend = true;
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
  }

  closeAction(){
    this.userRegisterService.changeLogInState(false)
    this.userRegisterService.changeSignUpState(false)
  }



}
