import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    imports: [ReactiveFormsModule, CommonModule, HeaderVoltarComponent, FooterComponent]
})
export class CadastroComponent {

  constructor(private router: Router) { }

  cadastro = new FormGroup ({
    cpf: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    confirmacao_email: new FormControl('', Validators.required),
    confirmacao_senha: new FormControl('', Validators.required)
  });

  redirecionarParaLogin() {
    this.router.navigate(['/login']);
  }


}
