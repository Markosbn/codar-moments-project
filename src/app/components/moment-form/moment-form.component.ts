import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; //imports para controle do formulario

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string;

  momentForm!: FormGroup; // declarado formGroup com o nome do formGroup declarado no template 
  // "!" usado para informar que o objeto ira existir

  constructor() { }

  ngOnInit(): void { // usado para iniciar as funções do angular como o formulario
    this.momentForm = new FormGroup({
      id: new FormControl(''), //Declarar o atributo com FormControl para ser "controlovel", e ser possivel fazer as validações.
      title: new FormControl('', [Validators.required]), //[Validators.required] define que o campo é obrigatorio
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    })
  // declaração do FormGroup com o nome dado no template, e aqui no component, e dentro dele é declarado todos os atributos que o formulario tem para que seja controlado de forma dinamica pelo reactive form
  }

  get title() { //criado get como objeto para capturar o atributo do form criado acima
    return this.momentForm.get('title')!;
  }

  get description() { //criado get como objeto para capturar o atributo do form criado acima
    return this.momentForm.get('description')!;
  }

  submit() {
    if(this.momentForm.invalid){
      return; //trava para que se o formulario reativo estiver invalido, não continua a submiçao
    }

    console.log("Enviou formulario")
  }
}
