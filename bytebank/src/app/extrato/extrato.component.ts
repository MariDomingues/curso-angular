import { Transferencia } from './../models/transferencia.model';
import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  // @Input() transferencias: any[] = [];
  transferencias: any[] = [];

  constructor(private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.transferenciaService.getTransferencias().subscribe((transferencias: Transferencia[]) => {
      this.transferencias = transferencias;
    });
  }
}
