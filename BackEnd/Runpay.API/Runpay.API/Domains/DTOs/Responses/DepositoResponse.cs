namespace DTOs.Responses
{
    public class DepositoResponse
    {
        public decimal ValorDeposito { get; set; }
        public string Mensagem { get; set; } = string.Empty;

        /* para gerar a mensagem- desposito realizado com sucesso*/
        public void SetMensagemSucesso()
        {
            Mensagem = "Depósito realizado com sucesso.";
        }

        /* criar uma mensagem personalizada, de erro ou algo do tipo*/
        public void SetMensagem(string mensagem)
        {
            Mensagem = mensagem;
        }
    }
}
