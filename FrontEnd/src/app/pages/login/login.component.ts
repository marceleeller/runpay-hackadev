import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [provideNgxMask(), AuthService],
    imports: [HeaderVoltarComponent, FooterComponent, CommonModule, ReactiveFormsModule, NgxMaskDirective, HttpClientModule]
})

export class LoginComponent {
    constructor(private rotas: Router, private authService: AuthService) { }

    senhaExibida: boolean = false;
    icone:string = 'bi-eye'
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
    onLogin(): void {
      if(this.formularioLogin.valid) {

        console.log(this.formularioLogin.value);
        this.authService.postLogin(this.formularioLogin.value).subscribe({
          next: (response:any) => {
            console.log(response);
            this.mensagemSucesso = true;
            this.mensagemErro = false;
            this.authService.guardarToken(response.token);
            setTimeout(() => { this.rotas.navigateByUrl('/inicial'); }, 1000);
          },
          error: (error:any) => {
            console.log(error);
            this.mensagemErro = true;
            this.mensagemSucesso = false;
          }
        })
      }

      // const userList = JSON.parse(localStorage.getItem('userList') as string);
      // const email = this.formularioLogin.value.email;
      // const senha = this.formularioLogin.value.senha;
      // let userValido:any;

      // userList.forEach((item:any) => {
      //   if (item.email == email && item.senha == senha) {
      //       userValido = {
      //           nome: item.nome,
      //           email: item.email,
      //           senha: item.senha
      //       }
      //   }
      // });

      // if (userValido == undefined) {
      //   this.senhaIncorreta = true
      //   this.rotas.navigateByUrl('/login');
      // } else {
      //   let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
      //   localStorage.setItem('token', token);
      //   localStorage.setItem('usuarioLogado', JSON.stringify(userValido))
      //   this.rotas.navigateByUrl('/inicial');
      // }

    }

    toggleSenhaExibida() {
      this.senhaExibida = !this.senhaExibida;
      if (this.senhaExibida) {
        this.icone = 'bi-eye-slash'
      } else {
        this.icone = 'bi-eye'
      }
    }
}
