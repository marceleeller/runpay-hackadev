import { Component, Input, inject } from '@angular/core';
import { ModalSairComponent } from "../modal-sair/modal-sair.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app-header-inicial',
    standalone: true,
    templateUrl: './header-inicial.component.html',
    styleUrl: './header-inicial.component.css',
    imports: [ModalSairComponent]
})
export class HeaderInicialComponent {
  nome:any;
  cliente:any;

  // Exibir modal
  private modalService = inject(NgbModal);

  constructor(private clienteService: ClienteService) {
    this.clienteService.getCliente().subscribe(res => {
      this.cliente = res.clienteParaRetornar;
      this.nome = this.cliente.nome.replace(/\b\w/g, (l: string) => l.toUpperCase());
    });
  }

	open() {
		const modalRef = this.modalService.open(ModalSairComponent);
		modalRef.componentInstance.titulo = 'Deseja realmente sair?';
    modalRef.componentInstance.linkRedirecionar = 'home';
	}
}
