import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Cadastro } from '../../models/cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private readonly url:string = 'https://localhost:7008/api/clientes/';

  postCadastro(dados: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(`${this.url}cadastro`, dados).pipe(first());
  }

}
