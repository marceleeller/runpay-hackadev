import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContatoService } from '../../services/contato.service';
import { HttpClientModule } from '@angular/common/http';
import { Contato } from '../../../models/contato.model';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-contato',
    standalone: true,
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css',
    imports: [HeaderHomeComponent, FooterComponent, CommonModule, ReactiveFormsModule, NgxMaskDirective, HttpClientModule],
    providers: [ ContatoService, provideNgxMask()]
})
export class ContatoComponent {

  processando = false;

  constructor(private servico: ContatoService, private toastr: ToastrService) { }

  formularioMensagem = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    mensagem: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  get nome(): FormControl {
    return this.formularioMensagem.get('nome') as FormControl;
  }
  get email(): FormControl {
    return this.formularioMensagem.get('email') as FormControl;
  }
  get telefone(): FormControl {
    return this.formularioMensagem.get('telefone') as FormControl;
  }
  get cpf(): FormControl {
    return this.formularioMensagem.get('cpf') as FormControl;
  }
  get mensagem(): FormControl {
    return this.formularioMensagem.get('mensagem') as FormControl;
  }

  onFormSubmit() {
    this.processando = true;

    this.servico.criarFormularioContato(this.formularioMensagem.value as Contato).subscribe({
      error: () => {
        this.toastr.error('Erro ao enviar mensagem!', '');
        this.processando = false;
      },
      complete: () => {
        this.formularioMensagem.reset();
        this.toastr.success('Mensagem enviada com sucesso!', '');
        this.processando = false;
      }});
    }

}
