import { Routes } from '@angular/router';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { autenticarGuard } from './seguranca/autenticar.guard';
import { ContatoComponent } from './pages/contato/contato.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { DepositoComponent } from './pages/deposito/deposito.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent},
    { path: 'login', component: LoginComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'inicial',component: InicialComponent, canActivate:[autenticarGuard]},
    { path: 'transacoes', component: HistoricoComponent, canActivate:[autenticarGuard] },
    { path: 'transferencia', component: TransferenciaComponent, canActivate:[autenticarGuard] },
    { path: 'deposito', component: DepositoComponent, canActivate:[autenticarGuard] },
    { path: '**', title:'Home Page', component: HomeComponent}
];
