namespace Runpay.API.Domains.DTOs.Responses
{
    public class DepositoResponse
    {
        public decimal ValorDeposito { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string? Mensagem { get; set; } /* para uma descrição opcional sobre o depósito*/
        

        /* para gerar a mensagem- desposito realizado com sucesso*/
        public void SetMensagemSucesso()
        {
            Mensagem = "Depósito realizado com sucesso.";
        }
        
    }
}
