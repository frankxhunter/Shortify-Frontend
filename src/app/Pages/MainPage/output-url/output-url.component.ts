import { Component, Input } from '@angular/core';
import { QrOverlayComponent } from '../../../UtilsComponents/qr-overlay/qr-overlay.component';

@Component({
    selector: 'app-output-url',
    imports: [QrOverlayComponent],
    templateUrl: './output-url.component.html',
    styleUrl: './output-url.component.css'
})
export class OutputUrlComponent {
  @Input() shortUrl !: string

  copySuccess = false;

  showQrComponent=false;

  closeQrComponent(){
    this.showQrComponent=false;
  }

  openQrComponent(){
    this.showQrComponent=true;
  }


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
