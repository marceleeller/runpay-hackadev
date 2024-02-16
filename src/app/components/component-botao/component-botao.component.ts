import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-botao',
  standalone: true,
  imports: [],
  templateUrl: './component-botao.component.html',
  styleUrl: './component-botao.component.css'
})
export class ComponentBotaoComponent {
  @Input() icone: string | undefined; //icone do botao
  @Input() texto: string | undefined; // texto do botão
saldo: any;

}
