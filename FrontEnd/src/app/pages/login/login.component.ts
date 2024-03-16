import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [provideNgxMask()],
    imports: [HeaderVoltarComponent, FooterComponent, CommonModule, ReactiveFormsModule, NgxMaskDirective]
})

export class LoginComponent {
    constructor(private rotas: Router) { }

    mensagemErro:boolean = false;
    mensagemSucesso:boolean = false;

    // navegação
    redirecionarParaCadastro() {
      this.rotas.navigate(['/cadastro']);
    }

    // formulário
    formularioLogin = new FormGroup ({
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      senha: new FormControl('', Validators.required)
    });

    get cpf() {
      return this.formularioLogin.get('cpf');
    }

    get senha() {
      return this.formularioLogin.get('senha');
    }

    senhaIncorreta : boolean = false;
    // autenticar(): void {
    //   const userList = JSON.parse(localStorage.getItem('userList') as string);
    //   const email = this.formularioLogin.value.email;
    //   const senha = this.formularioLogin.value.senha;
    //   let userValido:any;

    //   userList.forEach((item:any) => {
    //     if (item.email == email && item.senha == senha) {
    //         userValido = {
    //             nome: item.nome,
    //             email: item.email,
    //             senha: item.senha
    //         }
    //     }
    //   });

    //   if (userValido == undefined) {
    //     this.senhaIncorreta = true
    //     this.rotas.navigateByUrl('/login');
    //   } else {
    //     let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
    //     localStorage.setItem('token', token);
    //     localStorage.setItem('usuarioLogado', JSON.stringify(userValido))
    //     this.rotas.navigateByUrl('/inicial');
    //   }

    // }
}
