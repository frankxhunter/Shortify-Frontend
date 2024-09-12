import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUrlComponent } from './form-url/form-url.component';
import { OutputUrlComponent } from './output-url/output-url.component';
import { ErrorComponent } from './error/error.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserRegisterService } from './services/user-register.service';
import { RegisterUserComponent } from './register-user/register-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormUrlComponent,
    OutputUrlComponent,
    ErrorComponent,
    NavBarComponent,
    RegisterUserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userRegisterService = inject(UserRegisterService);

  title = 'Shortify';
  fetchData = '';
  errorConnection = false;

  isRegisterUserActived = false;

  ngOnInit(): void {
    this.userRegisterService.logInState$.subscribe(() => {
      this.checkRegisterUserActiver();
    });
    this.userRegisterService.signUpState$.subscribe(() => {
      this.checkRegisterUserActiver();
    });
  }
  private checkRegisterUserActiver() {
    if (this.userRegisterService.checkIsAnyRegisterIsActivated()) {
      this.isRegisterUserActived = true;
    } else {
      this.isRegisterUserActived = false;
    }
  }

  fetchDataRefresh(data: string) {
    this.errorConnection = false;
    this.fetchData = '';
    setTimeout(() => {
      this.fetchData = data;
    }, 10);
  }

  errorFetch(data: boolean) {
    this.fetchData = '';
    this.errorConnection = data;
  }
}
