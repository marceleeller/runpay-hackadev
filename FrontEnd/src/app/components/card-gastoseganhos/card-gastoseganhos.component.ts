import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-gastoseganhos',
  standalone: true,
  imports: [],
  templateUrl: './card-gastoseganhos.component.html',
  styleUrl: './card-gastoseganhos.component.css'
})
export class CardGastoseganhosComponent {
@Input() mes: string = 'Fevereiro';
@Input() titulo: string = 'Ganhos';
@Input() valor: string = 'R$ 1.000,00';
@Input() icon: string = 'bi-coin';

}
