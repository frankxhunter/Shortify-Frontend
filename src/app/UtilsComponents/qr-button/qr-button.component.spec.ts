import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrButtonComponent } from './qr-button.component';

describe('QrButtonComponent', () => {
  let component: QrButtonComponent;
  let fixture: ComponentFixture<QrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
