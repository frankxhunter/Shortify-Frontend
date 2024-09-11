import { Component } from '@angular/core';
import { LogginButtonComponent } from './loggin-button/loggin-button.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogginButtonComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
