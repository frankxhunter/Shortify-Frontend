import { Component } from '@angular/core';
import { LogginButtonComponent } from './loggin-button/loggin-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogginButtonComponent, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
