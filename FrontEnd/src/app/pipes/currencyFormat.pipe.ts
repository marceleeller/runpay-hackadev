import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBRL',
  standalone: true
})
export class FormatBRLPipe implements PipeTransform {

  transform(value: any, includeCurrencySymbol: boolean = true): any {
    // Verifica se o valor é um número
    if (isNaN(value)) {
      return value;
    }

    // Converte o valor para uma string e adiciona duas casas decimais
    let formattedValue = parseFloat(value).toFixed(2);

    // Formata o valor com ponto separando milhares e vírgula para decimais
    formattedValue = formattedValue.replace('.', ',');
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Adiciona o símbolo de moeda no início
    if (includeCurrencySymbol) {
      formattedValue = 'R$ ' + formattedValue;
    }

    // Retorna o valor formatado
    return formattedValue;
  }

}
