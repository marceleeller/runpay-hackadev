import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    })
  }
  return next(req).pipe(
    catchError((err:any) => {
      if(err instanceof HttpErrorResponse && err.status === 401) {
        toastr.error('Sua sessão expirou, faça login novamente', '');
        localStorage.clear();
        router.navigate(['/login']);
      }
      return throwError(() => new Error(err.message));
    })
  );
};
