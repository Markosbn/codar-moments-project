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
  allMoments: Moment[] = []; // array para listar tudo que segura todos os momentos
  moments: Moment[] = []; // array para filtrar que é exibido
  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';
  
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

  onSearch(event: Event){
    const target = event.target as HTMLInputElement; //extraido target do evento para ser extraido o value
    const value = target.value; // extraido o value do target extraido anteriormente

    this.moments = this.allMoments.filter(moment => { //feito com que a lista que é exibida recebe a lista de todos os momentos filtrada
      return moment.title.toLowerCase().includes(value.toLowerCase()); // filtro é feito no campo title, comparando o valor passado, todos campos setados com lowercase para não ter erro na busca
    }); // esta busca foi feita como uma busca so do front, filtrando as listas ja consultadas anteriormente no back
  }

}
