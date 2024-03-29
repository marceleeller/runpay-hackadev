import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-botao',
  standalone: true,
  imports: [],
  templateUrl: './component-botao.component.html',
  styleUrl: './component-botao.component.css'
})
export class ComponentBotaoComponent {
  @Input() icone: string = '';  //icone do botao
  @Input() texto: string = ''; // texto do botão

  constructor(private routes:Router) { }

  redirecionarPara() {
    switch (this.texto) {
      case 'Transferir':
        this.routes.navigate(['transferencia']);
        break;
      case 'Histórico de transações':
        this.routes.navigate(['transacoes']);
        break;
      case 'Depositar':
        this.routes.navigate(['deposito']);
        break;
    }
  }

}
