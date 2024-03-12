import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args = this.removerAcentos(args.toLowerCase());

    return value.filter((item:any) => {
      let itemStr = JSON.stringify(item).toLowerCase();
      let itemStrSemAcento = this.removerAcentos(itemStr);
      return itemStrSemAcento.includes(args);
    });
  }

  removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }


}
