import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [],
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.css'
})
export class CopyButtonComponent {

  copySuccess = false;

  @Input() text: string = "";


  copyText(){
    //Verificar si el navegador soporta la api del portapapeles
    if(navigator.clipboard){
      navigator.clipboard.writeText(this.text).then(()=>{
        this.copySuccess = true
        setTimeout(()=>{
          this.copySuccess = false;
        }, 2000)
      }).catch(error=>{
        console.log("Error to copy text: "+ error);
      })
    }
  }
}
