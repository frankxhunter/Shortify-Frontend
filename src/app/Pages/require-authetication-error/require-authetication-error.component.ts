import { Component } from '@angular/core';
import { LogginButtonComponent } from "../MainPage/nav-bar/loggin-button/loggin-button.component";

@Component({
  selector: 'app-require-authetication-error',
  standalone: true,
  imports: [LogginButtonComponent],
  templateUrl: './require-authetication-error.component.html',
  styleUrl: './require-authetication-error.component.css'
})
export class RequireAutheticationErrorComponent {

}
