import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  apenasNumeros(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // caractere invalido, impedir input
      event.preventDefault();
    }
  }

  apenasCaracteres(event: any): void {
    const pattern = /[a-zA-Z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
    // caractere inválido, impedir input
    event.preventDefault();
    }
  }
}
