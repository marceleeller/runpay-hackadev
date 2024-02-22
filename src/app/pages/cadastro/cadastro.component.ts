import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  constructor(private router: Router) { 
    this.cadastro.get('confirmacao_senha')!.setValidators([this.validarConfirmacaoSenha.bind(this)]);
    this.cadastro.get('confirmacao_email')!.setValidators([this.validarConfirmacaoEmail.bind(this)]);

  }

  cadastro = new FormGroup ({
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
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
    const cpf: string = this.cadastro.value.cpf ?? '';;
    const nome: string = this.cadastro.value.nome ?? '';;
    const email: string = this.cadastro.value.email ?? '';;
    const senha: string = this.cadastro.value.senha ?? '';;
    const confirmacao_email: string = this.cadastro.value.confirmacao_email ?? '';;
    const confirmacao_senha: string = this.cadastro.value.confirmacao_senha ?? '';;
    
    alert("Conta criada com sucesso!")

    localStorage.setItem('cpf', cpf);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);
    localStorage.setItem('confirmacao_email', confirmacao_email);
    localStorage.setItem('confirmacao_senha', confirmacao_senha);

    this.router.navigateByUrl('/login');
  }

}
