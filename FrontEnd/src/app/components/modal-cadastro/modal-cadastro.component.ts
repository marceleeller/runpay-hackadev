import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './modal-cadastro.component.html',
  styleUrl: './modal-cadastro.component.css'
})
export class ModalCadastroComponent {
  activeModal = inject(NgbActiveModal);

  @Input() titulo:string = '';
  @Input() conteudo:string = '';
  @Input() botaoFechar:string = 'Fechar';
  @Input() botaoSair:string = 'Sair';

}
