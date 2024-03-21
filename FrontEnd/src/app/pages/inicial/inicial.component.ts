import { Component } from '@angular/core';
import { ComponentBotaoComponent } from "../../components/component-botao/component-botao.component";
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderInicialComponent } from "../../components/header-inicial/header-inicial.component";
import { Transacao } from '../../../models/transacao.model';
import { CardtransacaoComponent } from "../../components/cardtransacao/cardtransacao.component";
import { CommonModule } from '@angular/common';
import { ModalSairComponent } from "../../components/modal-sair/modal-sair.component";
import { CardGastoseganhosComponent } from "../../components/card-gastoseganhos/card-gastoseganhos.component";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../services/cliente.service';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [ComponentBotaoComponent, HeaderHomeComponent, FooterComponent, HeaderInicialComponent, CardtransacaoComponent, CommonModule, ModalSairComponent, CardGastoseganhosComponent, FormatBRLPipe]
})
export class InicialComponent {
  saldo: number = 1000.00;
  cliente:any;
  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  mes: string = this.mesAtual();
  valorGastos:number =  0.00;
  valorGanhos:number = 0.00;
  mostrarPrimeirosBotoes: boolean = true;
  mostrarSegundosBotoes: boolean = true;
  mostrarSaldo: boolean = true;
  icon:string = 'bi-eye-slash';

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient, private clienteService:ClienteService) {
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

    this.clienteService.getCliente().subscribe(res => {
      this.cliente = res.clienteParaRetornar;
      this.saldo = this.cliente.conta.saldo;
    });
  }

  ngOnInit(): void {
    //carrega transacoes
    this.clienteService.getTransacoes().subscribe(res => { this.transacoes = res;
      this.transacoesExibidas = this.transacoes.slice(0, 4);
      this.totalGanhos();
      this.totalGastos();
     });
  }

  mesAtual() {
    const nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const data = new Date();
    const nomeMes = nomesMeses[data.getMonth()];

    return nomeMes;
  }

  totalGanhos() {
    this.transacoes.forEach(transacao => {
      let primeiraPalavra = transacao.descricao.split(' ')[0];
      if (primeiraPalavra == 'De' || primeiraPalavra == 'Depósito') {
        this.valorGanhos += Number(transacao.valor);
      }
    });
  }

  totalGastos() {
    this.transacoes.forEach(transacao => {
      let primeiraPalavra = transacao.descricao.split(' ')[0];
      if (primeiraPalavra == 'Para') {
        this.valorGastos += Number(transacao.valor);
      }
    });
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
