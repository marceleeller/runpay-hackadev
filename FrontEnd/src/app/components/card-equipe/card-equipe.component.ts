import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MembroEquipe, RedeSocial } from '../../../models/equipe.model';

@Component({
  selector: 'app-card-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-equipe.component.html',
  styleUrl: './card-equipe.component.css'
})
export class CardEquipeComponent {

  @Input() membroEquipe:MembroEquipe | undefined;

}
