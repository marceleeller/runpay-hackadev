import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderHomeComponent]
})
export class HomeComponent {

}
