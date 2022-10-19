import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
  }

  async createHandler(moment: Moment){ //metodo que ira rodar quando o filho enviar os dados, declarado como assincrono pois ira aguardar o retorno da api, então ira rodar de forma separada
    const formData = new FormData(); //formData é usado para enviar formularios que contem imagens, ele não nescessita headears

    formData.append("title", moment.title);
    formData.append("description", moment.description);

    if (moment.image){
      formData.append("image", moment.image);
    }
    await this.momentService.createMoment(formData).subscribe(); // consumindo service com await para permanecer em assincrono e com subscribe para ser excutado, pois vem do observable
    // to do
    //exibir sg
    //redirect

  }
}
