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
    userValido:any;

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
        Validators.minLength(6)
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
      const userList = JSON.parse(localStorage.getItem('userList') as string);
      const email = this.formularioLogin.value.email;
      const senha = this.formularioLogin.value.senha;

      userList.forEach((item:any) => {
        if (item.email == email && item.senha == senha) {
            this.userValido = {
                nome: item.nome,
                email: item.email,
                senha: item.senha
            }
        }
      });

      console.log(userList)
      console.log(this.userValido)

      if (email == this.userValido.email && senha == this.userValido.senha) {
        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioLogado', JSON.stringify(this.userValido))
        this.rotas.navigateByUrl('/inicial');
      } else {
        this.senhaIncorreta = true
        this.rotas.navigateByUrl('/login');
      }
}

}
