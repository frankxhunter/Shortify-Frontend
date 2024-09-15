import { NgIf,NgClass} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../../services/user-register.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  passwordVisibility = false;

  loading = false;

  isClickBtnSend = false;

  userRegisterService = inject(UserRegisterService)

  userForm: FormGroup;

  constructor(_form:FormBuilder){
    this.userForm = _form.group({
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
    this.userRegisterService.fetchLogIn(this.userForm.value).subscribe((data: any)=>{
      this.loading = false;
      console.log(data);
      this.userRegisterService.setUserName(data.username)
      this.userRegisterService.changeLogInState(false);
    })
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
  }

  changeRegister(){
    this.userRegisterService.changeSignUpState(true)
  }


}
