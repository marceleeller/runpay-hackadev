import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }

  // metodos para travar input para apenas numeros ou caracteres
  apenasNumeros(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // caractere invalido, impedir input
      event.preventDefault();
    }
  }

  apenasCaracteres(event: any): void {
    const pattern = /[a-zA-Z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
    // caractere inválido, impedir input
    event.preventDefault();
  }
  }
}
