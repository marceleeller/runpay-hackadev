import { Component } from '@angular/core';
import { HeaderHomeComponent } from "../../components/header-home/header-home.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderHomeComponent, FooterComponent]
})
export class HomeComponent {

  constructor(private router: Router) { }

  redirecionarParaLogin() {
    this.router.navigate(['login']);
  }

  redirecionarParaCadastro() {
    this.router.navigate(['cadastro']);
  }

}
