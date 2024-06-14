import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaLibroComponent } from './carta-libro.component';

describe('CartaLibroComponent', () => {
  let component: CartaLibroComponent;
  let fixture: ComponentFixture<CartaLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
