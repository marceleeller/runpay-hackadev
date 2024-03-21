import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-confirmartransferencia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormatBRLPipe],
  templateUrl: './modal-confirmartransferencia.component.html',
  styleUrl: './modal-confirmartransferencia.component.css'
})
export class ModalConfirmartransferenciaComponent {
  @Input({ required: true}) formularioTransferencia!: FormGroup;

  activeModal = inject(NgbActiveModal);
  mensagemErro:boolean = false;
  mensagemSucesso:boolean = false;

  @Input() nomeConta:string = '';
  @Input() numeroConta:string = '';
  @Input() valorTransferencia:string = '';

  constructor(private clienteService:ClienteService, private rotas:Router){
  }
  // get
  getCampo(nomeCampo: string) {
    return this.formularioTransferencia.get(nomeCampo);
  }

  transferir() {
    this.clienteService.postTransferencias(this.formularioTransferencia.value).subscribe({
      next: () => {
        this.mensagemErro = false;
        this.mensagemSucesso = true;
        setTimeout(() => { this.formularioTransferencia.reset(); this.activeModal.close();  }, 1000);
      },
      error: () => {
        this.mensagemSucesso = false;
        this.mensagemErro = true;
      }
    });

  }
}
