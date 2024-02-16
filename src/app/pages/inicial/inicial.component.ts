import { Component } from '@angular/core';
import { ComponentBotaoComponent } from "../../components/component-botao/component-botao.component";

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [ComponentBotaoComponent]
})
export class InicialComponent {
[x: string]: any;
saldo: number = 32000;

}
