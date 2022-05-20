import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUnidade } from '../models/unidade.models';
import { Observable } from 'rxjs/internal/Observable';
import { api_unidades } from '../Constants/Urls';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  GetUnidades(): Observable<IUnidade[]> {
    return this.http.get<IUnidade[]>(api_unidades);
  }




}
