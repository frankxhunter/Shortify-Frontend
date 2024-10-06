import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.css',
})
export class MenuButtonComponent {

  @Input() activate = false;
  @Input() action = ()=> {}

  change(){
    // this.activate = !this.activate;
    this.action();
  }
}
