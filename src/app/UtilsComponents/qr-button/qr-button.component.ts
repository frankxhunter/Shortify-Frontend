import { Component, Input } from '@angular/core';
import { QrOverlayComponent } from '../qr-overlay/qr-overlay.component';

@Component({
  selector: 'app-qr-button',
  standalone: true,
  imports: [QrOverlayComponent],
  templateUrl: './qr-button.component.html',
  styleUrls: ['./qr-button.component.css']
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
