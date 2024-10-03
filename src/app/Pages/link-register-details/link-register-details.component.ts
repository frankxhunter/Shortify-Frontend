import { Component, Input } from '@angular/core';
import { Register } from '../../interfaces/register.interface';

@Component({
  selector: 'app-link-register-details',
  standalone: true,
  imports: [],
  templateUrl: './link-register-details.component.html',
  styleUrl: './link-register-details.component.css'
})
export class LinkRegisterDetailsComponent {

  @Input() registers !: Register[]

  show(){
    console.log(this.registers)
  }
}
