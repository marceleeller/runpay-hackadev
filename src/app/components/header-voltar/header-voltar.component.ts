import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-voltar',
  standalone: true,
  imports: [],
  templateUrl: './header-voltar.component.html',
  styleUrl: './header-voltar.component.css'
})
export class HeaderVoltarComponent {
 @Input()
  nomeDaPagina!: string;
}
