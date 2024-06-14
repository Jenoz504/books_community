import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPrestamoFormComponent } from './crear-prestamo-form.component';

describe('CrearPrestamoFormComponent', () => {
  let component: CrearPrestamoFormComponent;
  let fixture: ComponentFixture<CrearPrestamoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPrestamoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearPrestamoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
