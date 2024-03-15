namespace DTOs.Responses
{
    public class TransferenciaResponse
    {
        public decimal SaldoOrigemAposTransferencia { get; set; }
        public decimal SaldoDestinoAposTransferencia { get; set; }
        public string Mensagem { get; set; } = string.Empty;

        public void SetSaldoOrigemAposTransferencia(decimal saldo)
        {
            SaldoOrigemAposTransferencia = saldo;
        }

        public void SetSaldoDestinoAposTransferencia(decimal saldo)
        {
            SaldoDestinoAposTransferencia = saldo;
        }

        public void SetMensagem(string mensagem) /*criar mensagem de sucesso e de erro ou algo do tipo*/
        {
            Mensagem = "Transferencia realizada com sucesso.";
        }
    }
}
