export interface Cadastro {
  nome: string;
  nomeSocial: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  rgExpedidor: string;
  rgUf: string;
  nacionalidade: string;
  estadoCivil: string;
  genero: string;
  ddd: string;
  celular: string;
  email: string;
  confirmacaoEmail: string;
  endereco : {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  conta:{
    senha: string;
    confirmarSenha: string;
  };
}
