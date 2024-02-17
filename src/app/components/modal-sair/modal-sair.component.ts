import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-sair',
  standalone: true,
  imports: [],
  templateUrl: './modal-sair.component.html',
  styleUrl: './modal-sair.component.css'
})
export class ModalSairComponent {

  constructor(private routes: Router) { }

  redirecionarParaHome() {
    this.routes.navigate(['home']);
  }
}
