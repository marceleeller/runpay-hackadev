import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardtransacaoComponent } from './cardtransacao.component';

describe('CardtransacaoComponent', () => {
  let component: CardtransacaoComponent;
  let fixture: ComponentFixture<CardtransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardtransacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardtransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
