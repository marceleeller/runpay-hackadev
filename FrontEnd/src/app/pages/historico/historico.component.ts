import { Component, HostBinding, OnInit } from '@angular/core';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule } from '@angular/common';
import { CardtransacaoComponent } from '../../components/cardtransacao/cardtransacao.component';
import { HeaderVoltarComponent } from '../../components/header-voltar/header-voltar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ClienteService } from '../../services/cliente.service';

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
    FormsModule,
    FilterPipe
  ],
})

export class HistoricoComponent {

  @HostBinding('class')
  scrollClass = 'disable-scroll';
  transacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 12;
  todasTransacoesExibidas: boolean = false;
  mostrarBotaoCarregarMais = true;
  pesquisa: string = "";
  intervaloTempo: number = 30;
  searchText: any;
  valorSelecionado:any = 'Últimos 30 dias';
  imprimeValorSelecionado:string = 'Últimos 30 dias'

  opcoes: Array<any> = [];

  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getTransacoes().subscribe(res => {
      this.transacoes = res.map((transacao: { dataOperacao: string | number | Date; }) => ({
        ...transacao,
        dataOperacao: new Date(transacao.dataOperacao)
      }));

      this.transacoesFiltradas = this.transacoes.filter(transacao =>
        this.isDataRecente(new Date(transacao.dataOperacao), 30));

      this.carregarTransacoes();
    });

    this.criarOpcoesSeletor();
  }

  carregarTransacoes() {
    this.transacoesExibidas = this.transacoesFiltradas.slice(0, 6);
    this.verificarTodasTransacoesExibidas();
  }

  carregarMaisTransacoes() {
    const proximasTransacoes = this.transacoesFiltradas.slice(
      this.transacoesExibidas.length,
      this.transacoesExibidas.length + 6
    );
    this.transacoesExibidas.push(...proximasTransacoes);
    this.verificarTodasTransacoesExibidas();
  }

  verificarTodasTransacoesExibidas() {
    if (this.transacoesFiltradas.length <= this.transacoesExibidas.length) {
      this.todasTransacoesExibidas = true;
      this.mostrarBotaoCarregarMais = false;
    } else {
      this.todasTransacoesExibidas = false;
      this.mostrarBotaoCarregarMais = true;
    }
  }

  onFiltroAlterado() {
    this.imprimeValorSelecionado = this.valorSelecionado;

    this.alterarFiltro();
    this.carregarTransacoes();
  }

  alterarFiltro(){
    const mapeamentoMeses:any = {
      'Janeiro': 0,
      'Fevereiro': 1,
      'Março': 2,
      'Abril': 3,
      'Maio': 4,
      'Junho': 5,
      'Julho': 6,
      'Agosto': 7,
      'Setembro': 8,
      'Outubro': 9,
      'Novembro': 10,
      'Dezembro': 11,
    };

    switch (this.valorSelecionado) {
      case 'Últimos 30 dias':
        this.transacoesFiltradas = this.transacoes.filter(transacao =>
          this.isDataRecente(new Date(transacao.dataOperacao), 30));
        break;
      case 'Todas transações':
        this.transacoesFiltradas = this.transacoes;
        break;
      default:
        if (mapeamentoMeses[this.valorSelecionado] !== undefined) {
          this.transacoesFiltradas = this.transacoes.filter(transacao =>
            new Date(transacao.dataOperacao).getMonth() === mapeamentoMeses[this.valorSelecionado]);
        }
        break;
    }
  }

  isDataRecente(date: Date, days: number): boolean {
    const currentDate = new Date();
    const testDate = new Date(date);
    testDate.setDate(testDate.getDate() + days);

    return testDate >= currentDate;
  }

  onMudancaPesquisa() {
      if (this.searchText.length !== 0) {
        this.alterarFiltro();
        this.transacoesExibidas = this.transacoesFiltradas;
        this.todasTransacoesExibidas = true;
      }

      if(this.searchText.length === 0 || this.searchText === null) {
        this.carregarTransacoes();
        this.imprimeValorSelecionado = this.valorSelecionado;
      }
  }

  criarOpcoesSeletor() {
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const mesesAnoAnterior = Math.abs(mesAtual-11);
    let cont = mesAtual;
    this.opcoes.push({
      value: 'Últimos 30 dias',
      display: 'Últimos 30 dias'
    });
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      for (let i = cont-1; i >= 0; i--) {
        this.opcoes.push({
          value: nomeMeses[i],
          display: nomeMeses[i]
        });
        cont--;
      }
      for(let i = 11; i > 11 - mesesAnoAnterior; i--) {
        this.opcoes.push({
          value: nomeMeses[i],
          display: nomeMeses[i]
        });
      }
      this.opcoes.push({
        value: 'Todas transações',
        display: 'Todas transações'
      });
      return this.opcoes;
}

}
