import { Routes } from '@angular/router';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { autenticarGuard } from './seguranca/autenticar.guard';

export const routes: Routes = [
    { path: 'home', title:'Home Page', component: HomeComponent },
    { path:'cadastro', title:'Cadastro', component: CadastroComponent},
    { path:'login', title:'Login', component: LoginComponent},
    { path: 'inicial', title:'Página Inicial',component: InicialComponent, canActivate:[autenticarGuard]},
    { path: 'transacoes', title:'Histórico de Transações', component: HistoricoComponent, canActivate:[autenticarGuard] },
    { path: '**', title:'Home Page', component: HomeComponent}
];
