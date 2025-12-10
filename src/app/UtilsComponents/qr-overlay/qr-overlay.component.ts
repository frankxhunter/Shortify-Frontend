import { isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
@Component({
  selector: 'app-qr-overlay',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qr-overlay.component.html',
  styleUrls: ['./qr-overlay.component.css']
})
export class QrOverlayComponent {
  @Input() data: string = '';
  @Output() close = new EventEmitter<void>();

  isBrowser: boolean;

  @ViewChild('qr', { static: false }) qrElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  downloadQR() {
    if (!this.isBrowser) return; // SSR safety

    const canvas = document.querySelector('qrcode canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qr-code.png';
    link.click();
  }
}