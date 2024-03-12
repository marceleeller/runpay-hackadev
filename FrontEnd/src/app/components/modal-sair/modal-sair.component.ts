import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-sair',
  standalone: true,
  imports: [],
  templateUrl: './modal-sair.component.html',
  styleUrl: './modal-sair.component.css'
})
export class ModalSairComponent {

  constructor(private routes: Router) { }

  activeModal = inject(NgbActiveModal);

  @Input() titulo:string = '';
  @Input() botaoFechar:string = 'Fechar';
  @Input() botaoSair:string = 'Sair';
  @Input() rota:string = 'home';

  redirecionarPara() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    this.routes.navigate([this.rota]);
  }
}
