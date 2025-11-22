import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrOverlayComponent } from './qr-overlay.component';

describe('QrOverlayComponent', () => {
  let component: QrOverlayComponent;
  let fixture: ComponentFixture<QrOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
