import { Injectable } from '@angular/core';
import { IdClienteService } from './id-cliente.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly url:string = 'https://localhost:7008/api/';
  contaId:any;

  constructor(private http: HttpClient) {

  }

  getCliente(){
    return this.http.get<any>(`${this.url}clientes`);
  }

  getContaDestinatario(numeroConta:any){
    return this.http.get<any>(`${this.url}clientes/conta/${numeroConta}`);
  }

  getCpf(cpf:any){
    return this.http.get<any>(`${this.url}clientes/${cpf}`);
  }

  getTransacoes(){
    return this.http.get<any>(`${this.url}transacoes/historico`);
  }

  postDepositos(valor:any){
    return this.http.post<any>(`${this.url}transacoes/deposito`, valor);
  }

  postTransferencias(valor:any){
    return this.http.post<any>(`${this.url}transacoes/transferencia`, valor);
  }
}
