import { Component, Input, inject } from '@angular/core';
import { ModalSairComponent } from "../modal-sair/modal-sair.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header-inicial',
    standalone: true,
    templateUrl: './header-inicial.component.html',
    styleUrl: './header-inicial.component.css',
    imports: [ModalSairComponent]
})
export class HeaderInicialComponent {
  nomeArmazenado = localStorage.getItem('nome');

  // Exibir modal
  private modalService = inject(NgbModal);

	open() {
		const modalRef = this.modalService.open(ModalSairComponent);
		modalRef.componentInstance.titulo = 'Deseja realmente sair?';
    modalRef.componentInstance.linkRedirecionar = 'home';
	}
}
