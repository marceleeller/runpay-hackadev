import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardtransacaoComponent } from './cardtransacao.component';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule } from '@angular/common';

describe('CardtransacaoComponent', () => {
  let component: CardtransacaoComponent;
  let fixture: ComponentFixture<CardtransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardtransacaoComponent, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardtransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render transaction details', () => {
    const transacao: Transacao = {
      id: 1,
      nome: 'Exemplo',
      data: new Date(),
      tipo: 'Transferência',
      valor: 100.0
    };
    component.transacoes = [transacao];
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.nativeElement;
    expect(cardElement.textContent).toContain('Exemplo');
    expect(cardElement.textContent).toContain('Transferência');
  });
});
