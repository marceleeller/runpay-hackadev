import { Component, inject } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyMaskModule} from 'ng2-currency-mask';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ModalConfirmartransferenciaComponent } from '../../components/modal-confirmartransferencia/modal-confirmartransferencia.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';
import { on } from 'events';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
  imports: [HeaderVoltarComponent, CurrencyMaskModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, CommonModule, FormatBRLPipe],
  providers: [provideNgxMask()]
})

export class TransferenciaComponent {

cliente:any;
numeroConta:any;
saldo:string = '';
formularioTransferencia!: FormGroup;
mensagemErro: boolean = false;

constructor(private fb: FormBuilder, private clienteService:ClienteService){
  this.clienteService.getCliente().subscribe(res => {
    this.cliente = res.clienteParaRetornar;
    this.saldo = this.cliente.conta.saldo;
    this.numeroConta = this.cliente.conta.numeroConta;
  });

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
    contaDestinatario: this.fb.control('', [Validators.required, Validators.minLength(7)]),
    mensagem: this.fb.control('', Validators.maxLength(60)),
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
  this.clienteService.getContaDestinatario(this.formularioTransferencia.get('contaDestinatario')?.value).subscribe({
    next: (res) => {
      var nomeConta = res.contaParaRetornar.nomeCliente.replace(/\b\w/g, (l: string) => l.toUpperCase());
      this.mensagemErro = false;
      const modalRef = this.modalService.open(ModalConfirmartransferenciaComponent);
      modalRef.componentInstance.nomeConta = nomeConta;
      modalRef.componentInstance.formularioTransferencia = this.formularioTransferencia;
      modalRef.componentInstance.numeroConta = this.formularioTransferencia.get('contaDestinatario')?.value;
      modalRef.componentInstance.valorTransferencia = this.formularioTransferencia.get('valor')?.value;
    },
    error: (error) => this.onErro(error)
  });
}

onErro(error: any) {
  this.mensagemErro = true;
  console.log(error)
}

validarContaEValor() {
  var saldo = Number(this.saldo);
  var valor = Number(this.getCampo('valor')?.value);

  if (this.getCampo('contaDestinatario')?.valid && this.getCampo('valor')?.valid) {
    if(saldo > valor)
      return true;
  }
  return false;
}

}
