import { CanActivateFn, Router } from '@angular/router';

export const autenticarGuard: CanActivateFn = (route, state) => {

  const rota = new Router();

  if(localStorage.getItem('token') == undefined) {
    window.alert('Você precisa estar logado para acessar esta página.');
    rota.navigateByUrl('/login');
    return false;
  }

  return true
};
