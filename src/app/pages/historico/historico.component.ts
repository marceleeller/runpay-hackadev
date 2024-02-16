import { Component, OnInit } from '@angular/core';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule, formatDate } from '@angular/common';
import { CardtransacaoComponent } from '../../components/cardtransacao/cardtransacao.component';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";

@Component({
    selector: 'app-historico',
    standalone: true,
    templateUrl: './historico.component.html',
    styleUrls: ['./historico.component.css'],
    imports: [CommonModule, CardtransacaoComponent, HeaderVoltarComponent]
})

export class HistoricoComponent implements OnInit {
  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 6;
  mostrarBotaoCarregarMais = true;

  constructor() { }

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.transacoes = [
      { id: 1, nome: 'Para João', data: new Date('2023-06-30'), tipo: 'Transferência', valor: 100.0 },
      { id: 2, nome: 'Farmácia', data: new Date('2024-02-12'), tipo: 'Pagamento', valor: -150.0 },
      { id: 3, nome: 'De Joaquim', data: new Date(), tipo: 'Transferência', valor: 200.0 },
      { id: 4, nome: 'Escola do Futuro', data: new Date('2024-02-13'), tipo: 'Pagamento', valor: -350.0 },
      { id: 5, nome: 'De Maria', data: new Date(), tipo: 'Transferência', valor: 600.0},
      { id: 6, nome: 'Para Laura', data: new Date('2023-12-24'), tipo: 'Transferência', valor: 180.0},
      { id: 7, nome: 'Para José', data: new Date('2023-06-30'), tipo: 'Transferência', valor: 120.0 },
      { id: 8, nome: 'Nosso Pão', data: new Date('2024-02-12'), tipo: 'Pagamento', valor: -190.0 },
      { id: 9, nome: 'De Marta', data: new Date(), tipo: 'Transferência', valor: 270.0 },
      { id: 10, nome: 'Curso de Inglês', data: new Date('2024-02-13'), tipo: 'Pagamento', valor: -400.0 },
      { id: 11, nome: 'De Ana', data: new Date(), tipo: 'Transferência', valor: 500.0},
      { id: 12, nome: 'Vinícius', data: new Date('2023-11-05'), tipo: 'Pagamento', valor: -380.0},
    ];

    if (this.transacoes.length > 6) {
      this.totalTransacoesExibidas = 6;
    } else {
      this.totalTransacoesExibidas = this.transacoes.length;
    }

    this.transacoesExibidas = this.transacoes.slice(0, this.totalTransacoesExibidas);

    this.transacoes.forEach(transacao => {
      transacao.dataFormatada = this.formatarData(transacao.data);
    });
  }

  formatarData(data: Date): string {
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    if (this.isMesmoDia(data, hoje)) {
      return 'Hoje';
    } else if (this.isMesmoDia(data, ontem)) {
      return 'Ontem';
    } else {
      return formatDate(data, 'dd MMM', 'en-US');
    }
  }

  isMesmoDia(data1: Date, data2: Date): boolean {
    return data1.getDate() === data2.getDate() &&
           data1.getMonth() === data2.getMonth() &&
           data1.getFullYear() === data2.getFullYear();
  }

  carregarMaisTransacoes() {
    this.totalTransacoesExibidas += 6;
    if (this.totalTransacoesExibidas >= this.transacoes.length) {
      this.mostrarBotaoCarregarMais = false;
    }
  }
}
