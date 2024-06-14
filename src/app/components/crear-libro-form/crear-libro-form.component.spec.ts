import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLibroFormComponent } from './crear-libro-form.component';

describe('CrearLibroFormComponent', () => {
  let component: CrearLibroFormComponent;
  let fixture: ComponentFixture<CrearLibroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearLibroFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearLibroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
