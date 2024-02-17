import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [HeaderVoltarComponent, FooterComponent, CommonModule, ReactiveFormsModule ]
})
export class LoginComponent {

    constructor(private router: Router) { }

    // navegação
    redirecionarParaCadastro() {
      this.router.navigate(['/cadastro']);
    }

    // formulário
    formularioLogin = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    })

  }
