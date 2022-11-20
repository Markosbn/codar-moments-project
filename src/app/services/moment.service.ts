import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../interfaces/Moments';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>> { //observable definido para receber o response criado anteriormente, e dentro do response os dados genericos neste cado se moments, usado para receber respostas mais estruturadas
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> { //criado metodo para busca do id individual
    return this.http.get<Response<Moment>>(`${this.apiUrl}/${id}`);
  }

  //criado metodo para consumir a api, service chamando a url definida atraves do environment
  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData); //semantica da requisição (url, body)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> { //metodo para update do momento
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData);
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`) //metodo de delação 
  }
}
