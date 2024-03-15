namespace DTOs.Responses
{
    public class SaqueResponse
    {
        public decimal SaldoAposSaque { get; set; } /*saldo apos o saque*/
        public string Mensagem { get; set; } = string.Empty;

        public void SetSaldoAtualizado(decimal novoSaldo)
        {
            SaldoAposSaque = novoSaldo;
        }

        public void SetMensagem(string mensagem) /*criar uma mensagem de envio com sucesso ou de erro*/
        {
            Mensagem = "Saque realizado com sucesso.";
        }
    }
}
