import { Routes } from '@angular/router';
import { HistoricoComponent } from './pages/historico/historico.component';
import { HomeComponent } from './pages/home/home.component';
import { InicialComponent } from './pages/inicial/inicial.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'inicial', component: InicialComponent},
    { path: 'transacoes', component: HistoricoComponent },
];

