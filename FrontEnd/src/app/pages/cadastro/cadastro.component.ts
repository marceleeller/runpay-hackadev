import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { FormularioEnderecoComponent } from './formulario-endereco/formulario-endereco.component';
import FormularioInfopessoaisComponent from './formulario-infopessoais/formulario-infopessoais.component';
import { CommonModule } from '@angular/common';
import { FormularioSenhaComponent } from "./formulario-senha/formulario-senha.component";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { idadeMinima } from './idade-minima-validator';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-cadastro',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    providers: [provideNgxMask()],
    imports: [RouterOutlet, HeaderVoltarComponent, FooterComponent, ReactiveFormsModule, FormularioEnderecoComponent, FormularioInfopessoaisComponent, CommonModule, FormularioSenhaComponent, NgxMaskDirective, HttpClientModule ]
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  formularioExibido = 'inicial';
  mostrarMensagemSucesso: boolean = false;
  invalidUser: boolean = false;
  cpfUtilizado: boolean = true;

  constructor(private fb: FormBuilder, private router: Router) {   }

  ngOnInit(): void {
    this.criarFormulario();

    this.cadastroForm.get('confirmarSenha')!.setValidators([this.validarConfirmacaoSenha.bind(this), Validators.required]);
    this.cadastroForm.get('confirmarEmail')!.setValidators([this.validarConfirmacaoEmail.bind(this), Validators.required]);
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      nome: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      nomeSocial: this.fb.control(''),
      dataNascimento: this.fb.control('', [Validators.required, idadeMinima(8)]),
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11)]),
      rg: this.fb.control('', Validators.required),
      rgExpedidor: this.fb.control('', Validators.required),
      rgUf: this.fb.control('', Validators.required),
      nacionalidade: this.fb.control('', Validators.required),
      estadoCivil: this.fb.control('', Validators.required),
      genero: this.fb.control('', Validators.required),
      ddd: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      celular: this.fb.control('', [Validators.required, Validators.minLength(9)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      confirmarEmail: this.fb.control(''),
      senha: this.fb.control('', [Validators.required, this.validarForcaSenha]),
      confirmarSenha: this.fb.control(''),
      endereco: this.fb.group({
        cep: this.fb.control('', [Validators.required, Validators.minLength(8)]),
        logradouro: this.fb.control('', Validators.required),
        numero: this.fb.control('', Validators.required),
        complemento: this.fb.control(''),
        bairro: this.fb.control('', Validators.required),
        cidade: this.fb.control('', Validators.required),
        estado: this.fb.control('', Validators.required)
      })
  });
  }

  cadastrar() {
    console.log(this.cadastroForm.value);
  }

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }

  // Validacoes
  validarForcaSenha(control:FormControl): { [key: string]: any } | null {
    const senha: string = control.value;

    if (!senha) return null;

    const temNumero = /[0-9]/.test(senha);
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);

    const senhaValida = temNumero && temMaiuscula && temMinuscula;

    return senhaValida ? null : { validarForcaSenha: true };
  }

  validarConfirmacaoSenha(control: AbstractControl): ValidationErrors | null {
    const senha: any = this.getCampo('senha')!.value;
    const confirmacaoSenha: string = control.value;

    if (senha !== confirmacaoSenha) {
      return { senhasDiferentes: true };
    } else {
      return null;
    }
  }

  validarConfirmacaoEmail(control: AbstractControl): ValidationErrors | null {
    const email: any = this.getCampo('email')!.value;
    const confirmacaoEmail:string = control.value;

    if(email !== confirmacaoEmail){
      return {emailsDiferentes: true};
    } else {
      return null;
    }
  }

  validarFormularioInfopessoais() {
    if (this.cadastroForm.get('nome') && this.cadastroForm.get('dataNascimento')?.valid && this.cadastroForm.get('rg')?.valid && this.cadastroForm.get('rgExpedidor')?.valid && this.cadastroForm.get('rgUf')?.valid && this.cadastroForm.get('nacionalidade')?.valid && this.cadastroForm.get('estadoCivil')?.valid && this.cadastroForm.get('genero')?.valid && this.cadastroForm.get('ddd')?.valid && this.cadastroForm.get('celular')?.valid) {
      return true;
    } else {
      return false;
    }
  }

  // navegação
  mudarParaFormularioEndereco(){
    this.formularioExibido = 'endereco';
  }

  mudarParaFormularioInfopessoais(){
    this.formularioExibido = 'infopessoais';
  }

  mudarParaFormularioSenha(){
    this.formularioExibido = 'senha';
  }

  mudarParaFormularioInicial(){
    this.formularioExibido = 'inicial';
  }

  redirecionarParaLogin() {
    this.router.navigate(['/login']);
  }
}
