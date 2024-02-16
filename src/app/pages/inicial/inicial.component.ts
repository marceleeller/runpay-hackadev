import { Component } from '@angular/core';
import { ComponentBotaoComponent } from "../../components/component-botao/component-botao.component";
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [ComponentBotaoComponent, HeaderHomeComponent, FooterComponent]
})
export class InicialComponent {
[x: string]: any;
saldo: number = 32000;

}
