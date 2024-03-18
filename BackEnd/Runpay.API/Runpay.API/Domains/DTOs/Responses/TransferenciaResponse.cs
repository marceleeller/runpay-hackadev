namespace DTOs.Responses
{
    public class TransferenciaResponse
    {
        public decimal TransferirDaContaId { get; set; }
        public decimal TransferirParaContaId { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string? Mensagem { get; set; } /*para descrição opcional*/

        public void SetTransferirDaContaId(decimal saldo)
        {
            TransferirDaContaId = saldo;
        }

        public void SetTransferirParaContaId(decimal saldo)
        {
           TransferirParaContaId = saldo;
        }

        public void SetMensagem() /*criar mensagem de sucesso */
        {
            Mensagem = "Transferencia realizada com sucesso.";
        }
         public void SetDescricao()
        {
            Descricao = Descricao;
        }
    }
}
