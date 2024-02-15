import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './header-cadastro.component.html',
  styleUrl: './header-cadastro.component.css'
})
export class HeaderCadastroComponent {
  @Input()
  nomeDaPagina!: string;
}
