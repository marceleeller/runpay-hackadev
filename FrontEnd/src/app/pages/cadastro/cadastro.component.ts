import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  formularioExibido = 'endereco';
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
        confirmarEmail: this.fb.control('', Validators.required),
        senha: this.fb.control(''),
        confirmarSenha: this.fb.control(''),
        endereco: this.fb.group({
          cep: this.fb.control('', [Validators.required, Validators.minLength(8)]),
          logradouro: this.fb.control(''),
          numero: this.fb.control(''),
          complemento: this.fb.control(''),
          bairro: this.fb.control(''),
          cidade: this.fb.control(''),
          estado: this.fb.control('')
        })
    });
  }

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

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get(nomeCampo);
  }
}
