import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
  }
  return next(req).pipe(
    catchError((err:any) => {
      if(err instanceof HttpErrorResponse && err.status === 401) {
        alert('Sua sessão expirou, faça login novamente');
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => new Error("Erro interno no servidor"));
    })
  );
};
