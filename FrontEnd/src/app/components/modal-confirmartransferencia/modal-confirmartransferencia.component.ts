import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private clienteService:ClienteService, private router:Router, private toastr:ToastrService){
  }
  // get
  getCampo(nomeCampo: string) {
    return this.formularioTransferencia.get(nomeCampo);
  }

  transferir() {
    this.clienteService.postTransferencias(this.formularioTransferencia.value).subscribe({
      next: () => {
        this.toastr.success('Transferência realizada!', '');
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['transferencia']);
          });
          this.activeModal.close();
        }, 1000);
      },
      error: () => {
        this.toastr.error('Senha incorreta', '');
      }
    });

  }
}
