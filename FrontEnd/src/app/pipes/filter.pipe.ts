import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    // Divida os argumentos em palavras
    const palavras = args.split(' ');

    // Use a segunda palavra para o filtro, se houver, caso contrário, use a primeira palavra
    const palavraFiltro = palavras.length > 1 ? this.removerAcentos(palavras[1].toLowerCase()) : this.removerAcentos(args.toLowerCase());

    return value.filter((item:any) => {
      let itemStr = JSON.stringify(item).toLowerCase();
      let itemStrSemAcento = this.removerAcentos(itemStr);
      return itemStrSemAcento.includes(palavraFiltro);
    });
  }

  removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }


}
