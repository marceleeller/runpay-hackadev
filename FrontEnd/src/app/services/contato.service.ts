import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Contato } from '../../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  private readonly url:string = 'https://localhost:7008/api/contato';


  criarFormularioContato(obj: Contato):Observable<any> {
    return this.http.post<Contato>(this.url, obj).pipe(first());
  }
}
