import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [provideNgxMask(), AuthService],
    imports: [HeaderVoltarComponent, FooterComponent, CommonModule, ReactiveFormsModule, NgxMaskDirective, HttpClientModule]
})

export class LoginComponent {

    constructor(private rotas: Router, private authService: AuthService, private toastr: ToastrService) { }

    senhaExibida: boolean = false;
    icone:string = 'bi-eye'
    processando: boolean = false;

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
      this.processando = true;
      if(this.formularioLogin.valid) {
        this.authService.postLogin(this.formularioLogin.value).subscribe({
          next: (response:any) => {
            this.toastr.success(response.mensagem.message, '');
            this.authService.guardarToken(response.token);
            setTimeout(() => { this.rotas.navigateByUrl('/inicial'); }, 1000);
          },
          error: (error:any) => {
            this.processando = false;
            if (error.status === 401) {
              this.toastr.error(error.error, '');
            } else {
              this.toastr.error(error.error, '');
            }
          }
        })
      }
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
