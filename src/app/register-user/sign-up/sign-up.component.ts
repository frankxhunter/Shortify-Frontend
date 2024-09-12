import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../../services/user-register.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  passwordVisibility = false;

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
  }

  changePasswordVisibility(){
    this.passwordVisibility = !this.passwordVisibility;
  }

}
