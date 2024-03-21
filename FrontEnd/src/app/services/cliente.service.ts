import { Injectable } from '@angular/core';
import { IdClienteService } from './id-cliente.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly url:string = 'https://localhost:7008/api/';
  contaId:any;

  constructor(private idService:IdClienteService, private http: HttpClient) {

    this.idService.getContaId().subscribe(contaId => {
      this.contaId = contaId;
    });
  }

  getCliente(){
    return this.http.get<any>(`${this.url}clientes/cliente/${this.contaId}`);
  }

  getContaDestinatario(numeroConta:any){
    return this.http.get<any>(`${this.url}clientes/conta/${numeroConta}`);
  }

  getTransacoes(){
    return this.http.get<any>(`${this.url}/transacoes/historico/${this.contaId}`);
  }

  postDepositos(valor:any){
    return this.http.post<any>(`${this.url}transacoes/deposito/${this.contaId}`, valor);
  }

  postTransferencias(valor:any){
    return this.http.post<any>(`${this.url}transacoes/transferencia/${this.contaId}`, valor);
  }
}
