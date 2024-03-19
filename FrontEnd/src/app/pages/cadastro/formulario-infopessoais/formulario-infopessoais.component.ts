import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'formulario-infopessoais',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './formulario-infopessoais.component.html',
  styleUrl: './formulario-infopessoais.component.css'
})
export default class FormularioInfopessoaisComponent {

  @Input({ required: true}) cadastroForm!: FormGroup;

  constructor(public formService: FormService) { }

  generos = [
    { value: 0, exibicao: 'Cis Feminino' },
    { value: 1, exibicao: 'Cis Masculino' },
    { value: 2, exibicao: 'Feminino' },
    { value: 3, exibicao: 'Masculino' },
    { value: 4, exibicao: 'Não Binário' },
    { value: 5, exibicao: 'Outro' },
  ];

  estadosCivis = [
    { value: 0, exibicao: 'Solteiro(a)' },
    { value: 1, exibicao: 'Casado(a)' },
    { value: 2, exibicao: 'Viuvo(a)' },
    { value: 3, exibicao: 'Divorciado(a)' },
    { value: 4, exibicao: 'União Estável' },
  ];

  estados: string[] = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }

}
