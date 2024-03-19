namespace Runpay.API.Domains.DTOs.Responses
{
    public class ConsultaSaldoResponse
    {
        public int ContaId { get; set; }
        public decimal ConsultarSaldo { get; set; } // Saldo da conta consultada
        public string Mensagem { get; set; } // Mensagem opcional para informar o resultado da operação
        public ConsultaSaldoResponse()
        {
            Mensagem = string.Empty; // Inicializa a propriedade Mensagem com uma string vazia
        }
        public void SetMensagemSucesso()
        {
            Mensagem = "Consulta de saldo realizada com sucesso.";
        }
    }
}
