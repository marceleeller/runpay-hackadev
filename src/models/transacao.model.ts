export interface Transacao {
    id: number;
    nome: string;
    data: Date;
    tipo: 'Pagamento' | 'Transferência';
    valor: number;
    dataFormatada?: string;
  }