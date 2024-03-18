import { Component, inject } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyMaskModule} from 'ng2-currency-mask';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ModalConfirmartransferenciaComponent } from '../../components/modal-confirmartransferencia/modal-confirmartransferencia.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
  imports: [HeaderVoltarComponent, CurrencyMaskModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, CommonModule],
  providers: [provideNgxMask()]
})

export class TransferenciaComponent {

numeroConta: string = '12345';
saldo: string = '12.000,00';
formularioTransferencia!: FormGroup;

constructor(private fb: FormBuilder){

}
  // Exibir modal
  private modalService = inject(NgbModal);

ngOnInit() {
  this.criarFormulario();

  this.formularioTransferencia.get('valor')?.valueChanges.subscribe(value => {
    if (value === null || value === '') {
      this.formularioTransferencia.get('valor')?.setValue('0', {emitEvent: false});
    }
  });
}

criarFormulario(){
  this.formularioTransferencia = this.fb.group({
    valor: this.fb.control('', [Validators.required, Validators.min(0.01)]),
    conta: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    descricao: this.fb.control('', Validators.maxLength(60)),
    senha: this.fb.control('', [Validators.required, Validators.minLength(6)])
  })
}

// get
getCampo(nomeCampo: string) {
  return this.formularioTransferencia.get(nomeCampo);
}

getDescricaoLength() {
  const descricao = this.getCampo('descricao')?.value || '';
  return descricao.length;
}

abrirModalConfirmacao() {
  const modalRef = this.modalService.open(ModalConfirmartransferenciaComponent);
  modalRef.componentInstance.formularioTransferencia = this.formularioTransferencia;
  modalRef.componentInstance.nomeConta = 'Luis Otávio'; //conectar com o back
  modalRef.componentInstance.numeroConta = this.formularioTransferencia.get('conta')?.value;
  modalRef.componentInstance.valorTransferencia = this.formularioTransferencia.get('valor')?.value;
}

validarContaEValor() {
  if (this.getCampo('conta')?.valid && this.getCampo('valor')?.valid) {
    return true;
  }
  return false;
}

}
