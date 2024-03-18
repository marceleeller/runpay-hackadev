namespace DTOs.Responses
{
    public class ConsultaSaldoResponse
    {
        public decimal ConsultarSaldo { get; set; } // Saldo da conta consultada
        public string Mensagem { get; set; } // Mensagem opcional para informar o resultado da operação

            // Construtor para inicializar a propriedade Mensagem
        public ConsultaSaldoResponse()
        {
            Mensagem = string.Empty; // Inicializa a propriedade Mensagem com uma string vazia
        }

        public void SetMensagemSucesso()
        {
            Mensagem = "Consulta de saldo realizada com sucesso.";
        }

       /* public void SetMensagemErro(string erro)
        {
            Mensagem = $"Erro ao consultar saldo: {erro}";
        }*/
    }
}
