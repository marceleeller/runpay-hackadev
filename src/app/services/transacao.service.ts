import { Injectable } from '@angular/core';
import { Transacao } from '../../models/transacao.model';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {


  carregarTransacoes(): Transacao[] {
    const transacoes: Transacao[] = [
      { id: 1, nome: 'Para João', data: new Date(), tipo: 'Transferência', valor: 100.00 },
      { id: 2, nome: 'Farmácia', data: new Date('2024-02-16'), tipo: 'Pagamento', valor: -150.0 },
      { id: 3, nome: 'De Joaquim', data: new Date('2024-02-14'), tipo: 'Transferência', valor: 200.0 },
      { id: 4, nome: 'Escola do Futuro', data: new Date('2024-02-08'), tipo: 'Pagamento', valor: -350.0 },
      { id: 5, nome: 'De Maria', data: new Date('2024-02-03'), tipo: 'Transferência', valor: 600.0},
      { id: 6, nome: 'Para Laura', data: new Date('2024-01-28'), tipo: 'Transferência', valor: 180.0},
      { id: 7, nome: 'Para José', data: new Date('2024-01-25'), tipo: 'Transferência', valor: 120.0 },
      { id: 8, nome: 'Nosso Pão', data: new Date('2024-01-16'), tipo: 'Pagamento', valor: -190.0 },
      { id: 9, nome: 'De Marta', data: new Date('2024-01-4'), tipo: 'Transferência', valor: 270.0 },
      { id: 10, nome: 'Curso de Inglês', data: new Date('2024-01-1'), tipo: 'Pagamento', valor: -400.0 },
      { id: 11, nome: 'De Ana', data: new Date('2023-12-28'), tipo: 'Transferência', valor: 500.0},
      { id: 12, nome: 'Vinícius', data: new Date('2023-12-25'), tipo: 'Pagamento', valor: -380.0},
    ];
    return transacoes;
  }
}
