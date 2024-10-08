import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRegisterService } from '../../../../services/user-register.service';

@Component({
  selector: 'app-loggin-button',
  standalone: true,
  imports: [UpperCasePipe, TitleCasePipe],
  templateUrl: './loggin-button.component.html',
  styleUrl: './loggin-button.component.css',
})
export class LogginButtonComponent {
  private userRegisterService = inject(UserRegisterService);
  private subcription: Subscription | null = null;

  username: string | null = null;

  ngOnInit(): void {
    this.subcription = this.userRegisterService.usernameState$.subscribe(
      (usernameNew) => {
        this.username = usernameNew;
      }
    );
  }

  ngAfterContentInit(): void {
    if(window != null)
    this.userRegisterService.checkUsername();
  }


  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  logInActivate(state: boolean){
    this.userRegisterService.changeLogInState(state)
  }

  signUpActivate(state: boolean){
    this.userRegisterService.changeSignUpState(state)
  }
}
