import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'formulario-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-senha.component.html',
  styleUrl: './formulario-senha.component.css'
})
export class FormularioSenhaComponent {
  @Input({ required: true}) cadastroForm!: FormGroup;

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }
}
