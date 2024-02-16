import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBotaoComponent } from './component-botao.component';

describe('ComponentBotaoComponent', () => {
  let component: ComponentBotaoComponent;
  let fixture: ComponentFixture<ComponentBotaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentBotaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentBotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
