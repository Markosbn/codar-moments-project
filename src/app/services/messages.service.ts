import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message: string = ''; //messagem que sera levada ao componente de mensageria

  constructor() { }

  add(message: string){
    this.message = message;

    setTimeout(() => {
      this.clear();
    }, 4000); //timeout de 4 seg definido para limpar a mensagem chamando o metodo de clear para limpar mensagem
  }

  clear() {
    this.message = '';
  }
}
