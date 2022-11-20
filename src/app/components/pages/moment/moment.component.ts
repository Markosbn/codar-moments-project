import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/interfaces/Moments';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  commentForm!: FormGroup;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService, //importado service para buscar o momento
    private activatedRoute: ActivatedRoute, //importado activatedRoute para buscar o id da url passada
    private router: Router,
    private commentService: CommentService,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    //trazer dado, pegando id na url
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // metodo de coleta do id(nome definido na url)

    this.momentService
      .getMoment(id)
      .subscribe((response) => (this.moment = response.data)); //chamado metodo e dado subscribe para acompanhar a requisição, e dado a resposta é jogado os dados do momento para o momento que aqui é esperado

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value; // enviado o valor do formulario para uma varivel de comment pois o formulario precisa de mais dados para enviar;

    data.momentId = Number(this.moment!.id); //definido que o moment vai estar presente

    await this.commentService
      .createComment(data.momentId, data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messageService.add("Comentário adicionado!");

    this.commentForm.reset(); // comando para limpar o formulario da tela
    formDirective.resetForm(); //limpa o formulario do front
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messageService.add("Momento excluído com sucesso!");

    this.router.navigate(['/']); //retorna para o home
  }
}
