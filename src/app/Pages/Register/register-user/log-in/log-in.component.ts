import { Component, inject } from '@angular/core';
import { UserRegisterService } from '../../../../services/user-register.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from "../../../../UtilsComponents/register-component/register-component.component";

@Component({
  selector: 'app-log-in',
  imports: [MatProgressSpinnerModule, RegisterComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  isFinishFetch = false;
  error: string | null = null;

  userRegisterService = inject(UserRegisterService)



  sendData(data: any) {
    this.userRegisterService.fetchLogIn(data).subscribe((data: any) => {
      this.isFinishFetch = true;
      this.userRegisterService.setUserName(data.email)
      this.userRegisterService.changeLogInState(false);
    }, error => {
      this.isFinishFetch = true;
      this.error = error.error.error;
    })
  }


}
