import { Injectable } from '@angular/core';
import { Transacao } from '../../models/transacao.model';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {


  carregarTransacoes(): Transacao[] {
    const transacoes: Transacao[] = [
      { id: 1, nome: 'Para João', data: new Date(), tipo: 'Transferência', valor: -100.00 },
      { id: 2, nome: 'Para Pedro', data: new Date(), tipo: 'Transferência', valor: -150.00 },
      { id: 3, nome: 'Para Carlos', data: new Date('2024-02-17T00:00:00'), tipo: 'Transferência', valor: -220.0 },
      { id: 4, nome: 'De Mary', data: new Date('2024-02-16T00:00:00'), tipo: 'Transferência', valor: 300.0},
      { id: 5, nome: 'Farmácia', data: new Date('2024-02-15T00:00:00'), tipo: 'Pagamento', valor: -150.0 },
      { id: 6, nome: 'De Debora', data: new Date('2024-02-14T00:00:00'), tipo: 'Transferência', valor: 100.0 },
      { id: 7, nome: 'De Joaquim', data: new Date('2024-02-12T00:00:00'), tipo: 'Transferência', valor: 200.0 },
      { id: 8, nome: 'Escola do Futuro', data: new Date('2024-02-08T00:00:00'), tipo: 'Pagamento', valor: -350.0 },
      { id: 9, nome: 'De Andre', data: new Date('2024-02-04T00:00:00'), tipo: 'Transferência', valor: 400.0},
      { id: 10, nome: 'De Maria', data: new Date('2024-02-03T00:00:00'), tipo: 'Transferência', valor: 600.0},
      { id: 11, nome: 'Para Laura', data: new Date('2024-02-02T00:00:00'), tipo: 'Transferência', valor: -180.0},
      { id: 12, nome: 'Para Marcos', data: new Date('2024-01-28T00:00:00'), tipo: 'Transferência', valor: -150.0},
      { id: 13, nome: 'Nosso Pão', data: new Date('2024-01-26T00:00:00'), tipo: 'Pagamento', valor: -190.0 },
      { id: 14, nome: 'Ferragem', data: new Date('2024-01-25T00:00:00'), tipo: 'Pagamento', valor: -200.0 },
      { id: 15, nome: 'Para José', data: new Date('2024-01-24T00:00:00'), tipo: 'Transferência', valor: -120.0 },
      { id: 16, nome: 'Padaria', data: new Date('2024-01-16T00:00:00'), tipo: 'Pagamento', valor: -100.0 },
      { id: 17, nome: 'De Cintia', data: new Date('2024-01-05T00:00:00'), tipo: 'Transferência', valor: 170.0 },
      { id: 18, nome: 'De Marta', data: new Date('2024-01-04T00:00:00'), tipo: 'Transferência', valor: 270.0 },
      { id: 19, nome: 'Curso de Inglês', data: new Date('2023-12-29T00:00:00'), tipo: 'Pagamento', valor: -400.0 },
      { id: 20, nome: 'De Ana', data: new Date('2023-12-28T00:00:00'), tipo: 'Transferência', valor: 500.0},
      { id: 21, nome: 'Vinícius', data: new Date('2023-12-25T00:00:00'), tipo: 'Pagamento', valor: -380.0},
      { id: 22, nome: 'Curso de Frances', data: new Date('2023-12-08T00:00:00'), tipo: 'Pagamento', valor: -380.0 },
      { id: 23, nome: 'Aula de musica', data: new Date('2023-12-06T00:00:00'), tipo: 'Pagamento', valor: -350.0 },
      { id: 24, nome: 'Marcelo', data: new Date('2023-12-02T00:00:00'), tipo: 'Pagamento', valor: -280.0},
    ];
    return transacoes.sort((a, b) => b.data.getTime() - a.data.getTime());
  }
}
