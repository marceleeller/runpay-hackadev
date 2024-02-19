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

  redirecionarPara() {
    switch (this.logo) {
      case '../../../assets/icone-degrade.svg':
        this.routes.navigate(['inicial']);
        break;
      case '../../../assets/logo.svg':
        this.routes.navigate(['home']);
        break;
    }
  }


}
