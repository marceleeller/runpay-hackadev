import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transacao } from './../../../models/transacao.model';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-cardtransacao',
  standalone: true,
  templateUrl: './cardtransacao.component.html',
  styleUrls: ['./cardtransacao.component.css'],
  imports: [CommonModule],
})
export class CardtransacaoComponent {
  @Input() transacao: Transacao | undefined;
  transacoesExibidas: Transacao[] = [];
  @Output() carregarMais = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.transacao) {
      this.transacao.dataFormatada = this.formatarData(this.transacao.data);
    }
  }

  formatarValor(valor: number | undefined): string {
    if (valor === undefined) {
      return '';
    }
    return valor.toFixed(2).replace('.', ',');
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
      return formatDate(data, 'dd MMM', 'en-US').toLowerCase();
    }
  }

  isMesmoDia(data1: Date, data2: Date): boolean {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  }
}
