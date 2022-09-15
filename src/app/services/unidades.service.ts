import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUnidade } from '../models/unidade.models';
import { Observable } from 'rxjs/internal/Observable';
import { api_PostRegistro, api_putRegistro, api_Registro, api_unidades } from '../Constants/Urls';
import { RegistroMensal } from '../models/RegistroMensal';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/*+json',
        Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})


export class UnidadesService {

  idEdit: number =0;



  constructor(private http: HttpClient) {  }

  setIdEdit(id: number) {
    this.idEdit = id;
    console.log("set edit" + this.idEdit);
  }

  getIdEdit() {
    return this.idEdit;
    console.log("get edit"+this.idEdit);
  }


  GetUnidades(): Observable<IUnidade[]> {
    return this.http.get<IUnidade[]>(api_unidades);
  }


  PegarPeloId(Id: number): Observable<IUnidade> {
    Id = this.idEdit;
    const apiUrl = `${api_unidades}/${Id}`;
    return this.http.get<IUnidade>(apiUrl);
  }





  PutUnidades( Unidade: IUnidade): Observable<any> {
    return this.http.put<any>(api_unidades, Unidade);
  }


  ExcluirUnidade(unidadeId: number): Observable<any> {
    const apiUrl = `${api_unidades}/${unidadeId}`;
    return this.http.delete<number>(apiUrl);
  }


  GetRegistros(): Observable<RegistroMensal> {
    return this.http.get<RegistroMensal>(api_Registro);
  }




  PostProducao(Mensal: RegistroMensal): Observable<any> {
    return this.http.post<any>(api_PostRegistro, Mensal);

  }




  PutProducao(Mensal: RegistroMensal): Observable<any> {
  return this.http.put<any>(api_putRegistro,Mensal);

  }







}
