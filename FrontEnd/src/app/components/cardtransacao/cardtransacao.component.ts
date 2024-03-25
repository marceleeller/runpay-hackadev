import { Component, Input } from '@angular/core';
import { Transacao } from './../../../models/transacao.model';
import { CommonModule, formatDate } from '@angular/common';
import { TipoTransacaoPipe } from '../../pipes/tipotransacao.pipe';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';

@Component({
  selector: 'app-cardtransacao',
  standalone: true,
  templateUrl: './cardtransacao.component.html',
  styleUrls: ['./cardtransacao.component.css'],
  imports: [CommonModule, TipoTransacaoPipe, FormatBRLPipe],
})
export class CardtransacaoComponent {
  @Input() transacao: Transacao | undefined;

  ngOnInit(): void {
    if (this.transacao) {
      let data = new Date(this.transacao.dataOperacao);
      this.transacao.dataFormatada = this.formatarData(data);
    }
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
      return this.formatarDataFormatada(data);
    }
  }

  private formatarDataFormatada(data: Date): string {
    return formatDate(data, 'dd MMM YY', 'en-US').toLowerCase();
  }

  isMesmoDia(data1: Date, data2: Date): boolean {
    return (
      data1.getDate() === data2.getDate() &&
      data1.getMonth() === data2.getMonth() &&
      data1.getFullYear() === data2.getFullYear()
    );
  }

  getDescricaoPalavras(descricao: any): string {
    const palavras = this.getDescricaoFormatada(descricao).split(' ');
    if (palavras.length <= 3) {
      return palavras.join(' ');
    }
    return `${palavras[0]} ${palavras[1]} ${palavras[palavras.length - 1]}`;
  }

  getDescricaoFormatada(descricao: any): string {
    const palavras = descricao.toLowerCase().split(' ');
    const palavrasCapitalizadas = palavras.map((palavra: string) => {
      if (palavra === 'em') {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    });
    return palavrasCapitalizadas.join(' ');
  }

}
