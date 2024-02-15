import { Component, Input } from '@angular/core';
import { HeaderVoltarComponent } from "../../components/header-voltar/header-voltar.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [HeaderVoltarComponent, FormsModule]
})
export class LoginComponent {
[x: string]: any;
    @Input()
    senha!: string;
    email!: string;

    login() {
        console.log("Senha:", this.senha);
        console.log("Email:", this.email);       

    }


}
