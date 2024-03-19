import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCadastroComponent } from '../../components/modal-cadastro/modal-cadastro.component';
import { ClienteService } from '../../services/cliente.service';
import { Cadastro } from '../../../models/cadastro.model';

@Component({
    selector: 'app-cadastro',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    providers: [provideNgxMask(), ClienteService],
    imports: [RouterOutlet, HeaderVoltarComponent, FooterComponent, ReactiveFormsModule, FormularioEnderecoComponent, FormularioInfopessoaisComponent, CommonModule, FormularioSenhaComponent, NgxMaskDirective, HttpClientModule ]
})
export class CadastroComponent implements OnInit {

  cadastroForm!: FormGroup;
  formularioExibido = 'inicial';
  mostrarMensagemSucesso: boolean = false;
  invalidUser: boolean = false;
  processando = false;
  cpfUtilizado: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private clienteService: ClienteService) {   }

  ngOnInit(): void {
    this.criarFormulario();

    this.cadastroForm.get('conta.confirmarSenha')!.setValidators([this.validarConfirmacaoSenha.bind(this), Validators.required]);
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
      endereco: this.fb.group({
        cep: this.fb.control('', [Validators.required, Validators.minLength(8)]),
        logradouro: this.fb.control('', Validators.required),
        numero: this.fb.control('', Validators.required),
        complemento: this.fb.control(''),
        bairro: this.fb.control('', Validators.required),
        cidade: this.fb.control('', Validators.required),
        estado: this.fb.control('', Validators.required)
      }),
      conta: this.fb.group({
        senha: this.fb.control('', [Validators.required, Validators.minLength(6), this.validarForcaSenha]),
        confirmarSenha: this.fb.control(''),
      })
  });
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
    const senha: any = this.getCampo('conta.senha')!.value;
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

  // Exibir modal
  private modalService = inject(NgbModal);

  abrirModalTermos() {
    const modalRef = this.modalService.open(ModalCadastroComponent);
    modalRef.componentInstance.titulo = 'Termos de Uso';
    modalRef.componentInstance.conteudo = 'Os Termos de Uso do Banco RunPay são um conjunto de diretrizes e políticas que regem o uso dos nossos serviços financeiros. Ao adentrar em nossa plataforma, os usuários concordam em se submeter às disposições estabelecidas nesses termos, garantindo uma utilização responsável e ética dos serviços oferecidos. Comprometemo-nos a garantir a segurança e a privacidade das informações pessoais e financeiras dos nossos clientes, implementando medidas rigorosas de proteção de dados. Além disso, enfatizamos a importância da confidencialidade das credenciais de acesso e incentivamos os usuários a reportarem qualquer atividade suspeita ou não autorizada. O Banco RunPay reserva-se o direito de realizar alterações nos Termos de Uso, e recomendamos que os usuários revisem periodicamente essas modificações. Agradecemos por escolher o Banco RunPay como seu provedor de serviços financeiros.';
  }

  abrirModalPolitica() {
    const modalRef = this.modalService.open(ModalCadastroComponent);
    modalRef.componentInstance.titulo = 'Política de Privacidade';
    modalRef.componentInstance.conteudo = 'A Política de Privacidade do Banco RunPay é um compromisso com a segurança e confidencialidade das informações dos nossos usuários. Nossa política abrange a coleta, o uso e a proteção dos dados pessoais, seguindo os mais altos padrões de segurança e conformidade com a legislação aplicável. Ao utilizar nossos serviços, os usuários consentem com a coleta e o processamento de seus dados de acordo com esta política. Garantimos que as informações fornecidas serão utilizadas apenas para os fins especificados, como fornecer serviços financeiros, melhorar a experiência do usuário e cumprir obrigações legais. Comprometemo-nos a não compartilhar, vender ou alugar dados pessoais a terceiros sem consentimento expresso dos usuários, exceto quando exigido por lei ou para proteger nossos interesses legítimos. Além disso, implementamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, uso indevido ou divulgação. Os usuários têm o direito de acessar, corrigir ou excluir suas informações pessoais, e estamos comprometidos em fornecer os meios necessários para exercer esses direitos. Quaisquer dúvidas ou preocupações sobre nossa Política de Privacidade podem ser direcionadas ao nosso departamento de atendimento ao cliente.';
  }

  onSubmit() {
    this.processando = true;
    const formValue = {...this.cadastroForm.value};
    formValue.estadoCivil = Number(formValue.estadoCivil);
    formValue.genero = Number(formValue.genero);


    this.clienteService.postCadastro(formValue as Cadastro).subscribe({
      error: (error) => this.onErro(error),
      complete: () => this.onSucesso()
    });
  }

  onErro(error: any) {
    this.invalidUser = true;
    this.processando = false;
    console.log(error)
  }

  onSucesso() {
    this.invalidUser = false;
    this.mostrarMensagemSucesso = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
