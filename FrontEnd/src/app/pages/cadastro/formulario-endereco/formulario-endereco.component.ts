import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProcurarCepService } from '../../../services/procurar-cep.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'formulario-endereco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, NgxMaskDirective],
  templateUrl: './formulario-endereco.component.html',
  styleUrl: './formulario-endereco.component.css',
  providers: [ProcurarCepService, provideNgxMask()]
})
export class FormularioEnderecoComponent {

  @Input({ required: true}) cadastroForm!: FormGroup;

  constructor(private procurarCepService: ProcurarCepService, private cdr: ChangeDetectorRef, public formService: FormService) { }

  pesquisaFeita:boolean = false;
  mensagemErro:string | null = '';
  valorErro: string = '';

  estados: string[] = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']

  // get
  getCampo(nomeCampo: string) {
    return this.cadastroForm.get('endereco.' + nomeCampo);
  }

  procurarCep() {
    this.pesquisaFeita = false;
    this.mensagemErro = '';

    const cep = this.cadastroForm.get('endereco.cep')?.value;
    if (cep && cep.length === 8) {
      this.procurarCepService.buscarCEP(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            this.valorErro = this.getCampo('cep')?.value;
            this.mensagemErro = 'CEP não encontrado.';
          } else {
            this.cadastroForm.patchValue({
              endereco: {
                logradouro: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
              }
            });
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.valorErro = this.getCampo('cep')?.value;
          this.mensagemErro = 'Erro ao buscar CEP.';
          this.cdr.detectChanges();
        }
      })
    }
    else {
      this.mensagemErro = 'CEP inválido.';
      this.pesquisaFeita = true;
    }
  }
}
