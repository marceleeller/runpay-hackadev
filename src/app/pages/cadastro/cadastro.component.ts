import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastro = new FormGroup ({
    cpf: new FormGroup(''),
    nome: new FormGroup(''),
    email: new FormGroup(''),
    senha: new FormGroup(''),
    confirmacao_email: new FormGroup(''),
    confirmacao_senha: new FormGroup('')
  });
}
