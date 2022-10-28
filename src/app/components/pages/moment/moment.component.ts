import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  constructor(
    private momentService: MomentService, //importado service para buscar o momento
    private activatedRoute: ActivatedRoute //importado activatedRoute para buscar o id da url passada
  ) {}

  ngOnInit(): void {
    //trazer dado, pegando id na url
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // metodo de coleta do id(nome definido na url)

    this.momentService
      .getMoment(id)
      .subscribe((response) => (this.moment = response.data)); //chamado metodo e dado subscribe para acompanhar a requisição, e dado a resposta é jogado os dados do momento para o momento que aqui é esperado
  }
}
