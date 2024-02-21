import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [HeaderVoltarComponent, FooterComponent, CommonModule, ReactiveFormsModule]
})

export class LoginComponent {

    constructor(private rotas: Router) { }

    // navegação
    redirecionarParaCadastro() {
      this.rotas.navigate(['/cadastro']);
    }

    // formulário
    formularioLogin = new FormGroup ({
      email: new FormControl('', [
        Validators.required, 
        Validators.email,
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.validarForcaSenha
      ])
    });

    get emailDoUsuario() {
      return this.formularioLogin.get('email');
    }

    get senhaDoUsuario() {
      return this.formularioLogin.get('senha');
    }

    senhaIncorreta : boolean = false;
    autenticar(): void {
  const email = this.formularioLogin.value.email;
  const senha = this.formularioLogin.value.senha;

  const emailArmazenado = localStorage.getItem('email');
  const senhaArmazenada = localStorage.getItem('senha');

  if (emailArmazenado === email && senhaArmazenada === senha) {
    this.rotas.navigateByUrl('/inicial');
  } else {
    this.senhaIncorreta = true
    this.rotas.navigateByUrl('/login');
  };
} 

//Passar a validação de força da senha para o cadastro
validarForcaSenha(control: FormControl): { [key: string]: any } | null {
  const senha: string = control.value;

  if (!senha) return null;

  const temNumero = /[0-9]/.test(senha);
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);

  const senhaValida = temNumero && temMaiuscula && temMinuscula;

  return senhaValida ? null : { validarForcaSenha: true };
}

}
