import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdClienteService {
  private _contaId = new BehaviorSubject<string>('');

  constructor(public authService:AuthService) {}

   public getId() {
    return this._contaId.asObservable();
  }

  public getContaId(): Observable<any> {
    return this.getId().pipe(map(val => {
      let contaIdToken = this.authService.getContaIdToken();
      this._contaId = val || contaIdToken;
      return this._contaId;
    }));
  }

}
