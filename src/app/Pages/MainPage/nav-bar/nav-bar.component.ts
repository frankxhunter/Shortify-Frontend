import { Component } from '@angular/core';
import { LogginButtonComponent } from './loggin-button/loggin-button.component';
import { RouterLink } from '@angular/router';
import { MenuButtonComponent } from "../../../UtilsComponents/menu-button/menu-button.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [LogginButtonComponent, RouterLink, MenuButtonComponent, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  activateMenu = false;

  changeActivateMenu = ()=>{
    this.activateMenu = !this.activateMenu;
  }

}
