import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const autenticarGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if(!!localStorage.getItem('token')) {
    return true;
  } else {
    alert('Você não tem permissão para acessar essa página');
    router.navigate(['/login']);
    return false;
  }
};
