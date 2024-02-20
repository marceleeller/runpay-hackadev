import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardEquipeComponent } from '../../components/card-equipe/card-equipe.component';

@Component({
    selector: 'app-sobre',
    standalone: true,
    templateUrl: './sobre.component.html',
    styleUrl: './sobre.component.css',
    imports: [HeaderHomeComponent, FooterComponent, CardEquipeComponent]
})
export class SobreComponent {

}
