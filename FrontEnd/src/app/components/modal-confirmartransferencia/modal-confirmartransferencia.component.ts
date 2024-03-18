import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';

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

  @Input() nomeConta:string = '';
  @Input() numeroConta:string = '';
  @Input() valorTransferencia:string = '';

  // get
  getCampo(nomeCampo: string) {
    return this.formularioTransferencia.get(nomeCampo);
  }

  transferir() {
    console.log('Transferência realizada com sucesso!');
    console.log(this.formularioTransferencia.value);
  }
}
