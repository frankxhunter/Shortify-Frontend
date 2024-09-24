import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireAutheticationErrorComponent } from './require-authetication-error.component';

describe('RequireAutheticationErrorComponent', () => {
  let component: RequireAutheticationErrorComponent;
  let fixture: ComponentFixture<RequireAutheticationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequireAutheticationErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequireAutheticationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
