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
    { value: 'CisFeminino', exibicao: 'Cis Feminino' },
    { value: 'CisMasculino', exibicao: 'Cis Masculino' },
    { value: 'Feminino', exibicao: 'Feminino' },
    { value: 'Masculino', exibicao: 'Masculino' },
    { value: 'NaoBinario', exibicao: 'Não Binário' },
    { value: 'Outro', exibicao: 'Outro' },
  ];

  estadosCivis = [
    { value: 'Solteiro', exibicao: 'Solteiro(a)' },
    { value: 'Casado', exibicao: 'Casado(a)' },
    { value: 'Viuvo', exibicao: 'Viuvo(a)' },
    { value: 'Divorciado', exibicao: 'Divorciado(a)' },
    { value: 'UniaoEstavel', exibicao: 'União Estável' },
  ];

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }

}
