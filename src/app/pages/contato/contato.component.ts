import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contato',
    standalone: true,
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css',
    imports: [HeaderHomeComponent, FooterComponent, CommonModule, ReactiveFormsModule]
})
export class ContatoComponent {

  formularioMensagem = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    mensagem: new FormControl('', Validators.required)
  });

  get nome(): FormControl {
    return this.formularioMensagem.get('nome') as FormControl;
  }
  get email(): FormControl {
    return this.formularioMensagem.get('email') as FormControl;
  }

}
