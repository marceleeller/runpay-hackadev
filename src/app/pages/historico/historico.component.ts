import { Component, HostBinding, OnInit } from '@angular/core';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule } from '@angular/common';
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

    this.transacoesExibidas = this.transacoes.slice(0, this.totalTransacoesExibidas);
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
}

