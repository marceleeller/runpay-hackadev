import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { InicialComponent } from './pages/inicial/inicial.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { CadastroComponent } from "./pages/cadastro/cadastro.component";
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HomeComponent, InicialComponent, HistoricoComponent, CadastroComponent, LoginComponent, RouterModule, RouterLink, HttpClientModule]
  })
export class AppComponent {
  title = 'runpay-hackadev';
}
