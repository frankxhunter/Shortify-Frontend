import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-url',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-url.component.html',
  styleUrl: './form-url.component.css'
})
export class FormUrlComponent {

  dataSend: boolean= false;

  @Output() fetchEvent = new EventEmitter<boolean>();

fetchData(){
  console.log("HOla")
  this.dataSend = !this.dataSend;
  this.fetchEvent.emit(this.dataSend)
}
}
