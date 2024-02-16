import { Component } from '@angular/core';
import { HeaderInicialComponent } from "../../components/header-inicial/header-inicial.component";

@Component({
    selector: 'app-inicial',
    standalone: true,
    templateUrl: './inicial.component.html',
    styleUrl: './inicial.component.css',
    imports: [HeaderInicialComponent]
})
export class InicialComponent {

}
