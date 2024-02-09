import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCadastroComponent } from './formulario-cadastro.component';

describe('FormularioCadastroComponent', () => {
  let component: FormularioCadastroComponent;
  let fixture: ComponentFixture<FormularioCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCadastroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
