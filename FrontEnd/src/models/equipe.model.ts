export interface RedeSocial{
  plataforma: string;
  link: string;
}

export interface MembroEquipe {
  img:string;
  nome:string;
  funcao:string;
  redesSociais:RedeSocial[];
}
