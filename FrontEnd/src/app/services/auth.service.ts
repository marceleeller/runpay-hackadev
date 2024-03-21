import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Cadastro } from '../../models/cadastro.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url:string = 'https://localhost:7008/api/';
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  postCadastro(dados: Cadastro): Observable<any> {
    return this.http.post<Cadastro>(`${this.url}clientes/cadastro`, dados).pipe(first());
  }

  postLogin(dados: any): Observable<any> {
    return this.http.post<any>(`${this.url}login`, dados).pipe(first());
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  guardarToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getClienteLogado(){
    return this.http.get<any>(`${this.url}clientes`).pipe(first());
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token')!;
    return jwtHelper.decodeToken(token);
  }

  getContaIdToken(){
    if(this.userPayload){
      return this.userPayload.ContaId
    }
  }
}
