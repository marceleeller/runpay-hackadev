import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-modal-sair',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './modal-sair.component.html',
  styleUrl: './modal-sair.component.css',
  providers: [AuthService]
})
export class ModalSairComponent {

  constructor(private routes: Router, private http: HttpClient, private authService: AuthService) { }

  activeModal = inject(NgbActiveModal);

  @Input() titulo:string = '';
  @Input() botaoFechar:string = 'Fechar';
  @Input() botaoSair:string = 'Sair';
  @Input() rota:string = 'home';

  logout() {
    this.authService.logout();
    this.activeModal.close('closed');
    this.routes.navigate([this.rota]);
  }
}
