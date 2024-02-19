import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-contato',
    standalone: true,
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.css',
    imports: [HeaderHomeComponent, FooterComponent]
})
export class ContatoComponent {

}
