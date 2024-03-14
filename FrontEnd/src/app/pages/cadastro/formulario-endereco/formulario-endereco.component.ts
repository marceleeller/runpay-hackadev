import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'formulario-endereco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-endereco.component.html',
  styleUrl: './formulario-endereco.component.css'
})
export class FormularioEnderecoComponent {

  @Input({ required: true}) cadastroForm!: FormGroup;

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }
}
