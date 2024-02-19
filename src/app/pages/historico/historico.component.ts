import { Component, HostBinding, OnInit } from '@angular/core';
import { Transacao } from '../../../models/transacao.model';
import { CommonModule } from '@angular/common';
import { CardtransacaoComponent } from '../../components/cardtransacao/cardtransacao.component';
import { TransacaoService } from '../../services/transacao.service';
import { HeaderVoltarComponent } from '../../components/header-voltar/header-voltar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
})

export class HistoricoComponent implements OnInit {
  @HostBinding('class')
  scrollClass = 'disable-scroll';
  transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  totalTransacoesExibidas: number = 12;
  todasTransacoesExibidas: boolean = false;
  mostrarBotaoCarregarMais = true;
  pesquisa: string = "";
  intervaloTempo: number = 30; 

  constructor(private transacaoService: TransacaoService) { }

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.transacoes = this.transacaoService.carregarTransacoes();
    this.transacoesExibidas = this.transacoes.slice(0, 6);
    this.verificarTodasTransacoesExibidas();
  }

  carregarMaisTransacoes() {
    const proximasTransacoes = this.transacoes.slice(
      this.transacoesExibidas.length,
      this.transacoesExibidas.length + 6
    );
    this.transacoesExibidas.push(...proximasTransacoes);
    this.verificarTodasTransacoesExibidas();
  }

  verificarTodasTransacoesExibidas() {
    if (this.transacoes.length <= this.transacoesExibidas.length) {
      this.todasTransacoesExibidas = true;
      this.mostrarBotaoCarregarMais = this.transacoesExibidas.length < this.transacoes.length;
    }
  }

  onFiltroAlterado(event: Event) {
    const target = event.target as HTMLSelectElement;
    const valorSelecionado = target.value;

    console.log('Valor selecionado:', valorSelecionado);

    let limite = 0;
    switch (valorSelecionado) {
      case 'Últimos 30 dias':
        limite = 30;
        break;
      case 'Últimos 60 dias':
        limite = 60;
        break;
      case 'Últimos 90 dias':
        limite = 90;
        break;
    }

    console.log("Limite",limite);
 
    const transacoesFiltradas = this.transacoes.filter(transacao =>
      this.isDataRecente(transacao.data, limite));
  
    this.transacoesExibidas = transacoesFiltradas.slice(0, 6);
    this.verificarTodasTransacoesExibidas();
  }
  
    isDataRecente(data: Date, limite: number): boolean {
      const hoje = new Date();
      const dataLimite = new Date(hoje.getTime() - limite * 24 * 60 * 60 * 1000);
      return data >= dataLimite;
    } 

    removerAcentos(texto: string): string {
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    
  
    pesquisar(tipoTransacao: string): void {
      const tipoTransacaoSemAcento = this.removerAcentos(tipoTransacao.toLowerCase());
      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - this.intervaloTempo); // Subtrai o intervalo de tempo da data atual
  
      this.transacoesExibidas = this.transacoes.filter(transacao => {
        const tipoTransacaoTransacao = this.removerAcentos(transacao.tipo.toLowerCase());
        return tipoTransacaoTransacao.includes(tipoTransacaoSemAcento);
      });
      

  }
    
}
