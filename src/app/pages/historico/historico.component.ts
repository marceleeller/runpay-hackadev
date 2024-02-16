import { Component, HostBinding, OnInit } from '@angular/core';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule, formatDate } from '@angular/common';
import { CardtransacaoComponent } from '../../components/cardtransacao/cardtransacao.component';
import { TransacaoService } from '../../services/transacao.service';
import { HeaderVoltarComponent } from '../../components/header-voltar/header-voltar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-historico',
  standalone: true,
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  imports: [
    CommonModule,
    CardtransacaoComponent,
    HeaderVoltarComponent,
    FooterComponent,
  ],
})
export class HistoricoComponent implements OnInit {
  @HostBinding('class')
  scrollClass = 'disable-scroll';
  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 6;
  todasTransacoesExibidas: boolean = false;
  mostrarBotaoCarregarMais = true;

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.transacoes = this.transacaoService.carregarTransacoes(6);
    this.verificarTodasTransacoesExibidas();

    this.transacoesExibidas = this.transacoes.slice(
      0,
      this.totalTransacoesExibidas
    );

    this.transacoesExibidas.forEach((transacao) => {
      transacao.dataFormatada = this.formatarData(transacao.data);
    });
  }

  carregarMaisTransacoes() {
    this.scrollClass = 'enable-scroll';
    const proximasTransacoes = this.transacoes.slice(
      this.transacoesExibidas.length,
      this.transacoesExibidas.length + this.totalTransacoesExibidas
    );
    this.transacoesExibidas = [
      ...this.transacoesExibidas,
      ...proximasTransacoes,
    ];
    this.verificarTodasTransacoesExibidas();
  }

  verificarTodasTransacoesExibidas() {
    if (this.transacoes.length <= this.transacoesExibidas.length) {
      this.todasTransacoesExibidas = true;
      this.mostrarBotaoCarregarMais = false;
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
