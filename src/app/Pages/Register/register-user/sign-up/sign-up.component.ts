import { Component, inject } from '@angular/core';
import { UserRegisterService } from '../../../../services/user-register.service';
import { User } from '../../../../interfaces/User.interface';
import { RegisterComponent } from "../../../../UtilsComponents/register-component/register-component.component";
@Component({
  selector: 'app-sign-up',
  imports: [RegisterComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  error: string | null = null;
  isFinishFetch = false;

  userRegisterService = inject(UserRegisterService);

  sendData(value: any) {
    this.userRegisterService.fetchSignUp(value).subscribe({
      next: (data: User) => {
        this.isFinishFetch = true;
        this.userRegisterService.setUserName(data.email);
        this.userRegisterService.changeSignUpState(false);
      },
      error: (error) => {
        this.isFinishFetch = true;
        this.error = error.error;
        console.log("Error")
      }
    }
    );
  }
}
