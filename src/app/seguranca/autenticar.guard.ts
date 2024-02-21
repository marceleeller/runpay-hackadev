import { CanActivateFn, Router } from '@angular/router';

export const autenticarGuard: CanActivateFn = (route, state) => {

  const rota = new Router();
  return true
};
