import { Component } from '@angular/core';
import { ComponentBotaoComponent } from '../../components/component-botao/component-botao.component';}

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [],
  templateUrl: './inicial.component.html',
  styleUrl: './inicial.component.css'
})
export class InicialComponent {
[x: string]: any;
saldo: number | null = null;

}
