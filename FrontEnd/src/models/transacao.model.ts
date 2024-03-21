export enum TipoTransacao {
  Deposito,
  Saque,
  Transferencia,
  Pagamento
}
export interface Transacao {
    id: number;
    descricao:string;
    dataOperacao: string;
    tipoTransacao: TipoTransacao;
    valor: number;
    dataFormatada:string;
  }
