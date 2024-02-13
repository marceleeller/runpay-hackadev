import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transacao } from './../../../models/transacao.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardtransacao',
  standalone: true,
  templateUrl: './cardtransacao.component.html',
  styleUrls: ['./cardtransacao.component.css'],
  imports: [CommonModule]
})
export class CardtransacaoComponent {
  @Input() transacoes: Transacao[] = [];
  transacoesExibidas: Transacao[] = [];
  @Output() carregarMais = new EventEmitter<void>();
}