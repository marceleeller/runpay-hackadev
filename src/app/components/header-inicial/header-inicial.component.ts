import { Component, Input } from '@angular/core';
import { ModalSairComponent } from "../modal-sair/modal-sair.component";

@Component({
    selector: 'app-header-inicial',
    standalone: true,
    templateUrl: './header-inicial.component.html',
    styleUrl: './header-inicial.component.css',
    imports: [ModalSairComponent]
})
export class HeaderInicialComponent {
  @Input() nomeUsuario: string = 'Fabiana Souza';
}
