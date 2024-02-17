import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-inicial',
  standalone: true,
  imports: [],
  templateUrl: './header-inicial.component.html',
  styleUrl: './header-inicial.component.css'
})
export class HeaderInicialComponent {
  @Input() nomeUsuario: string = 'Fabiana Souza';

  constructor(private routes: Router) { }

  redirecionarParaHome() {
    this.routes.navigate(['home']);
  }
}
