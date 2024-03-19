import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'formulario-senha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-senha.component.html',
  styleUrl: './formulario-senha.component.css'
})
export class FormularioSenhaComponent {


  @Input({ required: true}) cadastroForm!: FormGroup;
  senhaExibida: boolean = false;
  confirmacaoSenhaExibida: boolean = false;
  iconeConfirmacao:string = 'bi-eye'
  icone:string = 'bi-eye'

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }

  toggleSenhaExibida() {
    this.senhaExibida = !this.senhaExibida;
    if (this.senhaExibida) {
      this.icone = 'bi-eye-slash'
    } else {
      this.icone = 'bi-eye'
    }
  }

  toggleConfirmacaoSenhaExibida() {
    this.confirmacaoSenhaExibida = !this.confirmacaoSenhaExibida;
    if (this.confirmacaoSenhaExibida) {
      this.iconeConfirmacao = 'bi-eye-slash'
    } else {
      this.iconeConfirmacao = 'bi-eye'
    }
  }
}
