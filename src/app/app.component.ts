import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormUrlComponent } from './Pages/MainPage/form-url/form-url.component';
import { OutputUrlComponent } from './Pages/MainPage/output-url/output-url.component';
import { ErrorComponent } from './Pages/error/error.component';
import { NavBarComponent } from './Pages/MainPage/nav-bar/nav-bar.component';
import { UserRegisterService } from './services/user-register.service';
import { RegisterUserComponent } from './Pages/Register/register-user/register-user.component';
import { MenuButtonComponent } from "./UtilsComponents/menu-button/menu-button.component";

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
    MenuButtonComponent
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
