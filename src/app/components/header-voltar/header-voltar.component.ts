import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input()
  logo:string = '';

  constructor(private routes: Router) { }

  redirecionarParaHome() {
    this.routes.navigate(['home']);
  }
}
