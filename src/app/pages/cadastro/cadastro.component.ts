import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
    selector: 'app-cadastro',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    imports: [ReactiveFormsModule, CommonModule, HeaderVoltarComponent, FooterComponent, NgxMaskDirective],
    providers: [provideNgxMask()]
})
export class CadastroComponent {
cpf: any;

  constructor(private router: Router) { }

  cadastro = new FormGroup ({
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmacao_email: new FormControl('', Validators.required),
    confirmacao_senha: new FormControl('', Validators.required)
  });

  redirecionarParaLogin() {
    this.router.navigate(['/login']);
  }

  get cpfdoUsuario() {
    return this.cadastro.get('cpf') as FormControl;
  }

  get nomedoUsuario() {
    return this.cadastro.get('nome') as FormControl;
  }

  get emaildoUsuario() {
    return this.cadastro.get('email') as FormControl;
  }

  get senhadoUsuario() {
    return this.cadastro.get('senha') as FormControl;
  }
}
