import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgxMaskDirective, provideNgxMask} from 'ngx-mask';


@Component({
    selector: 'app-cadastro3',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    providers: [provideNgxMask()],
    imports: [ReactiveFormsModule, CommonModule, HeaderVoltarComponent, FooterComponent, NgxMaskDirective]
})
export class Cadastro3Component {
cpf: any;
mostrarMensagemSucesso = false;
  invalidUser: boolean = false;

  constructor(private router: Router) {
    this.cadastro.get('confirmacao_senha')!.setValidators([this.validarConfirmacaoSenha.bind(this)]);
    this.cadastro.get('confirmacao_email')!.setValidators([this.validarConfirmacaoEmail.bind(this)]);

  }

  cadastro = new FormGroup ({
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6), this.validarForcaSenha]),
    confirmacao_email: new FormControl('', Validators.required),
    confirmacao_senha: new FormControl('', Validators.required)
  });

  redirecionarParaLogin() {
    this.router.navigate(['/login']);
  }

  get cpfDoUsuario() {
    return this.cadastro.get('cpf') as FormControl;
  }

  get nomeDoUsuario() {
    return this.cadastro.get('nome') as FormControl;
  }

  get emailDoUsuario() {
    return this.cadastro.get('email') as FormControl;
  }

  get senhaDoUsuario() {
    return this.cadastro.get('senha') as FormControl;
  }

  validarForcaSenha(control: FormControl): { [key: string]: any } | null {
    const senha: string = control.value;

    if (!senha) return null;

    const temNumero = /[0-9]/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);

    const senhaValida = temNumero && temMaiuscula && temMinuscula;

    return senhaValida ? null : { validarForcaSenha: true };
  }

  get confirmacaoDeSenha() {
    return this.cadastro.get('confirmacao_senha') as FormControl;
  }


validarConfirmacaoSenha(control: AbstractControl): ValidationErrors | null {
  const senha: any = this.cadastro.get('senha')!.value;
  const confirmacaoSenha: string = control.value;

  if (senha !== confirmacaoSenha) {
    return { senhasDiferentes: true };
  } else {
    return null;
  }
}

get confirmacaoDeEmail() {
  return this.cadastro.get('confirmacao_email') as FormControl;
}

  validarConfirmacaoEmail(control: AbstractControl): ValidationErrors | null {
    const email: any = this.cadastro.get('email')!.value;
    const confirmacaoEmail:string = control.value;

    if(email !== confirmacaoEmail){
      return {emailsDiferentes: true};
    } else {
      return null;
    }
  }

  cadastrar(): void {
    const userList = JSON.parse(localStorage.getItem('userList') || '[]');
    console.log(userList);

    userList.forEach((user:any) => {
      if((user.cpf == this.cadastro.value.cpf) || (user.email == this.cadastro.value.email)){
          this.invalidUser = true;
      }
    });

    if(this.invalidUser == true) {
      console.log('Usuário já cadastrado')
      return;
    }

    userList.push(
      {
          cpf: this.cadastro.value.cpf ?? '',
          nome: this.cadastro.value.nome ?? '',
          email: this.cadastro.value.email ?? '',
          senha: this.cadastro.value.senha ?? ''
      }
  )

  localStorage.setItem('userList', JSON.stringify(userList))

  this.mostrarMensagemSucesso = true;

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  }

}
