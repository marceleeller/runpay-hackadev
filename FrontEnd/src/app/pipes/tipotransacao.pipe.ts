import { Pipe, PipeTransform } from '@angular/core';
import { TipoTransacao } from '../../models/transacao.model';

@Pipe({
  name: 'tipoTransacao',
  standalone: true
})
export class TipoTransacaoPipe implements PipeTransform {
  transform(value: any): string {
    return TipoTransacao[value];
  }
}
