import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/interfaces/Moments';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []; // array para listar tudo
  moments: Moment[] = []; // array para filtrar
  baseApiUrl = environment.baseApiUrl;
  
  constructor(private momentService: MomentService) { } //declarado service para requisitar os endpoints da api

  ngOnInit(): void { // on initi sera declarado o metodo para buscar os dados cadastrados, ao iniciar o componente
    this.momentService.getMoments().subscribe((itens) => {
      const data = itens.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR'); //feito map para transformar a date que vem em outra lingua para pt-BR, ! informa ao js que tera sempre informação
      });

      this.allMoments = data;
      this.moments = data;
    })
  }

}
