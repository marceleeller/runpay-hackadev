import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-inicial',
  standalone: true,
  imports: [],
  templateUrl: './header-inicial.component.html',
  styleUrl: './header-inicial.component.css'
})
export class HeaderInicialComponent {
  @Input() nomeUsuario: string = 'Fabiana Souza';
}
