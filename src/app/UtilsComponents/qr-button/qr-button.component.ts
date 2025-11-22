import { Component, Input } from '@angular/core';
import { QrOverlayComponent } from '../qr-overlay/qr-overlay.component';

@Component({
  selector: 'app-qr-button',
  imports: [QrOverlayComponent],
  templateUrl: './qr-button.component.html',
  styleUrl: './qr-button.component.css'
})
export class QrButtonComponent {

  @Input() data!: string;

  showQrComponent = false;

  closeQrComponent() {
    this.showQrComponent = false;
  }

  openQrComponent() {
    this.showQrComponent = true;
  }
}
