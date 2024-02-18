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

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [ComponentBotaoComponent, HeaderHomeComponent, FooterComponent, HeaderInicialComponent, CardtransacaoComponent, CommonModule, ModalSairComponent]
})
export class InicialComponent {
  saldo: number = 32000;

  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 6;

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.transacoes = this.transacaoService.carregarTransacoes();
    this.transacoesExibidas = this.transacoes.slice(0, 4);
  }

}
