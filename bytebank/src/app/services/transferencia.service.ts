import { Transferencia } from './../models/transferencia.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// essa anotação indica que essa classe pode ser instanciada atraves do contrutor e ela pode ser usada em qualquer modulo
@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private _transferencias: any[];
  private url = 'http://localhost:3000/transferencias';
  private httpClient: HttpClient;

  constructor(private pHttpClient: HttpClient) {
    this._transferencias = [];
    this.httpClient = pHttpClient
  }

  get transferencias() {
    return this._transferencias;
  }

  /*
      Requisições síncronas podem bloquear a execução do codigo, gerando um "congelamento"
    da tela, prejudicando a experiência do usuário. Pois uma tarefa só irá aconter após o
    termino da anterior.
      Requisições assíncrona você recebe um callback quando os dados forem recebidos, o
    que permite que o browser continue seu trabalho normalmente enquanto sua requisição
    estiver sendo processada. Assíncrono refere-se a um ambiente de comunicação onde cada
    parte recebe e processa mensagens quando for conveniente ou possível em vez de imediatamente.
  */

  /*
      O observable pode retornar a resposta em algum futuro, e quando eu quiser escutar o que
    veio dessa resposta eu vou me inscrever e vou escutar. Quando chegar uma resposta, lembrando
    que é assíncrono, esse método vai acontecer e o momento futuro vai chegar a resposta, quando
    chegar essa resposta quero escutar e saber o resultado dessa requisição.
  */
  getTransferencias() {
    return this.httpClient.get<Transferencia[]>(this.url);
  }

  adicionar(pTransferencia: Transferencia) {
    /*
        Os ...$event quebra o parametro para pegar cada atributo de dentro dele para adicionar
      o que ele ja possui (destino e valor) com a data.
    */
    this.adicionarData(pTransferencia);
    return this.httpClient.post<Transferencia>(this.url, pTransferencia);
  }

  private adicionarData(pTransferencia: any) {
    pTransferencia.data = new Date();
  }
}
