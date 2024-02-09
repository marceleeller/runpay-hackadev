import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLoginComponent } from './formulario-login.component';

describe('FormularioLoginComponent', () => {
  let component: FormularioLoginComponent;
  let fixture: ComponentFixture<FormularioLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
