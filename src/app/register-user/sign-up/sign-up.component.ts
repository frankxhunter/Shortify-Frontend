import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../../services/user-register.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  passwordVisibility = false;

  isClickBtnSend = false;

  loading = false;

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
    this.loading = true;
    this.userRegisterService.fetchSignUp(this.userForm.value).subscribe((data: any)=>{
      this.loading= false;
      console.log(data);
      this.userRegisterService.setUserName(data.username)
      this.userRegisterService.changeSignUpState(false);
    })
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
  }
  changeRegister(){
    this.userRegisterService.changeLogInState(true)
  }

}
