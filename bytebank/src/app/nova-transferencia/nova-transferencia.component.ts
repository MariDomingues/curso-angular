import { Transferencia } from './../models/transferencia.model';
import { TransferenciaService } from './../services/transferencia.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // O componente precisa ter o prefixo "app-" pq foi configurado no arquivo "angular.json" - "prefix": "app"
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent {

  @Output() onTransfer = new EventEmitter<any>();

  valor: number;
  destino: number;
  private transferenciaService: TransferenciaService;
  private router: Router;

  constructor(private pTransferenciaService: TransferenciaService, private pRouter: Router) {
    this.transferenciaService = pTransferenciaService;
    this.router = pRouter;
  }

  transferir() {
    const transferencia: Transferencia = {
      valor: this.valor,
      destino: this.destino
    };

    this.transferenciaService.adicionar(transferencia).subscribe({
      next: () => {
        this.limparCampos();
        this.router.navigateByUrl('extrato');
      },
      error: () => console.error()
    });
  }

  limparCampos() {
    this.destino = 0;
    this.valor = 0;
  }
}
