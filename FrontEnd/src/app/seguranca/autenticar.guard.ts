import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const autenticarGuard: CanActivateFn = (route, state) => {

  const isLocalStorageAvailable = typeof localStorage !== 'undefined';
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (isLocalStorageAvailable) {
    if(!!localStorage.getItem('token')) {
      return true;
    } else {
      toastr.error('Você não tem permissão para acessar essa página');
      router.navigate(['/login']);
      return false;
    }
  }

  return false;
};
