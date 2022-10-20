import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  faTimes = faTimes; // propriedade para uso dos icones do font awesome, instalados atraves do ng add @fortawesome/angular-fontawesome

  constructor(public messagesService: MessagesService) { } // definido como public para ter acesso no template

  ngOnInit(): void {
  }

}
