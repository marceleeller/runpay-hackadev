import { Component } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormatBRLPipe } from '../../pipes/currencyFormat.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard'

@Component({
    selector: 'app-deposito',
    standalone: true,
    templateUrl: './deposito.component.html',
    styleUrl: './deposito.component.css',
    imports: [HeaderVoltarComponent, CommonModule, ReactiveFormsModule, CurrencyMaskModule, FormatBRLPipe, ClipboardModule]
})
export class DepositoComponent {

  formularioDeposito!: FormGroup;
  paginaExibida:boolean = true;
  vencimento:string = '';
  codigoBoleto:string = '091254384920385943023423540912305940285940284059'
  textoBotao:string = 'Copiar código';

  constructor(private fb: FormBuilder){
    this.formatarVencimento();
  }


  ngOnInit() {
    this.criarFormulario();

    this.formularioDeposito.get('valor')?.valueChanges.subscribe(value => {
      if (value === null || value === '') {
        this.formularioDeposito.get('valor')?.setValue('0', {emitEvent: false});
      }
    });
  }

  criarFormulario(){
    this.formularioDeposito = this.fb.group({
      valor: this.fb.control('', [Validators.required, Validators.min(20)]),
    })
  }

  formatarVencimento() {
    let dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate() + 7);

    let meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    let dia = ('0' + dataAtual.getDate()).slice(-2);
    let mes = meses[dataAtual.getMonth()];

    this.vencimento = `${dia} ${mes}`;

    return this.vencimento;
  }

  copiarCodigo(){
    this.textoBotao = 'Código copiado!';
    setTimeout(() => {
      this.textoBotao = 'Copiar código';
    }, 2000);
  }

}
