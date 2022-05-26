import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { api_PostRegistro,  api_Registro } from 'src/app/Constants/Urls';

import { Producao } from 'src/app/models/producao';
import { Registro } from 'src/app/models/RegistroProd';
import { IUnidade } from 'src/app/models/unidade.models';
import { TransformService } from 'src/app/services/transform.service';

import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-cadastro-producao',
  templateUrl: './cadastro-producao.component.html',
  styleUrls: ['./cadastro-producao.component.css']
})
export class CadastroProducaoComponent implements OnInit {

  Unidade!: string;
  Data: String = "";
  TotalGerado!: number;
  Mensal: Registro = new Registro();
  Registro?:Registro;
  UsaPost:boolean =true;

  Unidades: IUnidade[] = [];
  formProd!: FormGroup;
  constructor(
    private unidadeservice: UnidadesService,
     private transform: TransformService ) { }


  ngOnInit(): void {
    this.createForm(new Producao());
    this.getUnidadesName();
    this.getProducao();
   
  }
  getProducao(){
    this.unidadeservice.GetRegistros().subscribe((response: any) => {
      this.Registro = response;
      let vetor = Object.values(response);
      let soma = 0;
      for (let i = 0; i < vetor.length - 1; i++) {
        soma += vetor[i] as any;
        console.log(soma);      }
      if(soma === 0){
        this.UsaPost = true;
      }else{
        this.UsaPost = false;
      }

    });
    ;
  }

  getUnidadesName(){
    this.unidadeservice.GetUnidades().subscribe(resposta => {
      this.Unidades = resposta;     
    });
  }

  createForm(Prod: Producao) {
    this.formProd = new FormGroup({
      Unidade: new FormControl(Prod.Unidade),
      Data: new FormControl(Prod.Data),
      TotalGerado: new FormControl(Prod.TotalGerado),
    })
  }
  public postProducao(formProd: Producao): void {    
    this.transform.setData(this.Data);
    this.transform.setValorDomes(formProd.TotalGerado);
    this.Mensal = this.transform.transform();
    if(this.UsaPost  === true){     
      this.unidadeservice.PostProducao(api_PostRegistro, this.Mensal);
    } else  {
      this.unidadeservice.PutProducao(api_Registro, this.Mensal );
    }   

  }
  onSubmit() {
    this.postProducao(this.formProd.value);
    this.formProd.reset();
  }




}
