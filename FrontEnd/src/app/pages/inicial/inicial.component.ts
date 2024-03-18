import { Component, HostBinding } from '@angular/core';
import { ComponentBotaoComponent } from "../../components/component-botao/component-botao.component";
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderInicialComponent } from "../../components/header-inicial/header-inicial.component";
import { TransacaoService } from '../../services/transacao.service';
import { Transacao } from '../../../models/transacao.model';
import { CardtransacaoComponent } from "../../components/cardtransacao/cardtransacao.component";
import { CommonModule } from '@angular/common';
import { ModalSairComponent } from "../../components/modal-sair/modal-sair.component";
import { CardGastoseganhosComponent } from "../../components/card-gastoseganhos/card-gastoseganhos.component";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [ComponentBotaoComponent, HeaderHomeComponent, FooterComponent, HeaderInicialComponent, CardtransacaoComponent, CommonModule, ModalSairComponent, CardGastoseganhosComponent]
})
export class InicialComponent {
  saldo: number = 32000;

  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 6;
  mes: string = this.mesAtual();
  valorGastos:string =  'R$ 1.000,00';
  valorGanhos: string = 'R$ 2.000,00';
  mostrarPrimeirosBotoes: boolean = true;
  mostrarSegundosBotoes: boolean = true;
  mostrarSaldo: boolean = true;
  icon:string = 'bi-eye-slash';

  constructor(private transacaoService: TransacaoService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      "(max-width: 767px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.mostrarSegundosBotoes = false;
      } else {
        this.mostrarSegundosBotoes = true;
        this.mostrarPrimeirosBotoes = true;
      }
    });
  }



  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.transacoes = this.transacaoService.carregarTransacoes();
    this.transacoesExibidas = this.transacoes.slice(0, 4);
  }

  mesAtual() {
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

    const data = new Date();
    const nomeMes = nomesMeses[data.getMonth()];

    return nomeMes;
  }

  mostrarSegundos() {
    this.mostrarSegundosBotoes = false;
    this.mostrarPrimeirosBotoes = true;
  }

  mostrarPrimeiros() {
    this.mostrarPrimeirosBotoes = false;
    this.mostrarSegundosBotoes = true;
  }

  exibirSaldo() {
    this.mostrarSaldo = !this.mostrarSaldo;
    if (this.mostrarSaldo == true) {
      this.icon = 'bi-eye-slash';
    } else {
      this.icon = 'bi-eye';
    }
  }

}
