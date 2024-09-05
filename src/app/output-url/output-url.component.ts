import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-url',
  standalone: true,
  imports: [],
  templateUrl: './output-url.component.html',
  styleUrl: './output-url.component.css'
})
export class OutputUrlComponent {
  @Input() shortUrl !: string

  copySuccess = false;

  copyText(){
    //Verificar si el navegador soporta la api del portapapeles
    if(navigator.clipboard){
      navigator.clipboard.writeText(this.shortUrl).then(()=>{
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
