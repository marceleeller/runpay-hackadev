import { Component } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule} from 'ng2-currency-mask';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-transferencia',
  standalone: true,
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
  imports: [HeaderVoltarComponent, CurrencyMaskModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()]
})

export class TransferenciaComponent {
numeroConta: string = '12345';
saldo: string = '12.000,00';
formularioTransferencia!: FormGroup;

ngOnInit() {
  this.criarFormulario();

  this.formularioTransferencia.get('valor')?.valueChanges.subscribe(value => {
    if (value === null || value === '') {
      this.formularioTransferencia.get('valor')?.setValue('0', {emitEvent: false});
    }
  });
}

criarFormulario(){
  this.formularioTransferencia = new FormGroup ({
    valor: new FormControl(''),
    conta: new FormControl(''),
    descricao: new FormControl(''),
    senha: new FormControl('')
  });
}

getDescricaoLength() {
  const descricao = this.formularioTransferencia.get('descricao')?.value || '';
  return descricao.length;
}

}
