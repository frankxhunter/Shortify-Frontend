import { NgIf, NgClass } from '@angular/common';
import { Component, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRegisterService } from '../../services/user-register.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoogleLoginComponent } from '../../Pages/Register/google-login/google-login.component';
import { GoogleAuthResponse } from '../../Models/GoogleAuthResponse';
import { EventEmitter } from '@angular/core';
import { VibrationDirective } from '../../directives/vibration.directive';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, MatProgressSpinnerModule, GoogleLoginComponent, VibrationDirective],
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponent {

  userRegisterService = inject(UserRegisterService)

  @ViewChildren(VibrationDirective) vibrationFields!: QueryList<VibrationDirective>;

  @Input() set errorData(error: string | null) {
    if (error) {
      this.error = error
      this.isClickBtnSend = false;
      this.loading = false;
      console.log(error);
    }
  }
  @Input() set isFinishFetch(isFinishFetch: boolean) {
    if (isFinishFetch) {
      this.loading = false;
      this.isClickBtnSend = false;
    }

  }

  @Input() registrationText !:string
  @Input() textForChangeRegistration !:string
  @Input() textForOtherRegistration !:string
  @Input() isLogIn !:boolean


  error: string | null = null;

  loading = false;

  @Output()
  emitData = new EventEmitter<any>()

  userForm: FormGroup;

  isClickBtnSend = false;
  passwordVisibility = false;

  constructor(_form: FormBuilder) {
    this.userForm = _form.group({
      email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z\d-_]+@[a-zA-Z0-9.]+.[a-z]+$/)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)(?!.*\s).{8,16}$/)]],

    })
  }

  hasError(controlName: string, typeError: string) {
    return (this.userForm.get(controlName)?.getError(typeError) && (this.userForm.get(controlName)?.touched || this.isClickBtnSend));
  }
  hasAnyError(controlName: string) {
    return !!this.userForm.get(controlName)?.errors && (this.userForm.get(controlName)?.touched || this.isClickBtnSend) 
  }

  sendData() {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      this.vibrationFields.forEach(field =>{
        field.vibration()
      });
    }else{
      this.error = null
      this.isClickBtnSend = true;
      this.loading = true;
      console.log("234234234")
      this.emitData.emit(this.userForm.value)
    }
  }

  onGoogleLoginSuccesfull(token: string) {
    this.loading = false;
    this.error = null
    this.isClickBtnSend = true;
    this.loading = true;
    this.userRegisterService.fetchGoogleAuth(token).subscribe({
      next: (data) => {
        const response = data as GoogleAuthResponse;
        this.loading = false;
        console.log(data);
        this.userRegisterService.setUserName(response.email)
        this.userRegisterService.changeLogInState(false);
      },
      error: (error) => {
        console.log(error);
        this.error = error.error.error;
      },
      complete: () => {
        this.loading = false;
      }

    })
  }

  changePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  changeRegister() {
    if(this.isLogIn){
    this.userRegisterService.changeSignUpState(true)
    }else{
      this.userRegisterService.changeLogInState(true)
    }
  }


}
