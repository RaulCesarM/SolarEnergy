
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  api_putRegistro } from 'src/app/Constants/Urls';
import { Producao } from 'src/app/models/producao';
import { RegistroMensal } from 'src/app/models/RegistroMensal';
import { IUnidade } from 'src/app/models/unidade.models';
import { TransformService } from 'src/app/services/transform.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Component({
  selector: 'app-cadastro-producao',
  templateUrl: './cadastro-producao.component.html',
  styleUrls: ['./cadastro-producao.component.css']
})
export class CadastroProducaoComponent implements OnInit {

  unidade!: string;
  data: string = "";
  totalGerado!: number;

  RegistroMensal!: RegistroMensal;
  status:number | undefined


  Unidades: IUnidade[] = [];
  formProd!: FormGroup;
  constructor(
    private unidadeservice: UnidadesService,
    private transform: TransformService,
    ) { }


  ngOnInit():any {

    this.getUnidadesName();
    this.createForm(new Producao());
    this.unidadeservice.GetRegistros().subscribe((response: any) => {
      this.transform.mensal = response;
    });

  }

  getUnidadesName(){
    this.unidadeservice.GetUnidades().subscribe(resposta => {
      this.Unidades = resposta;
    });
  }

  createForm(Prod: Producao) {
    this.formProd = new FormGroup({
      Unidade: new FormControl(Prod.unidade),
      Data: new FormControl(Prod.data),
      TotalGerado: new FormControl(Prod.totalGerado),
    })
  }
  public postProducao(formProd: Producao ): void {

    this.transform.setData(this.data);
    this.transform.setValorDomes(this.formProd.value.TotalGerado);
    console.log(typeof (formProd.totalGerado));
    let Mensal = this.transform.transform();
   if(Mensal.idRegistro ===0){
      this.unidadeservice.PostProducao(Mensal).subscribe();
    }else{
      this.unidadeservice.PutProducao(Mensal).subscribe();
   }




    console.log(Mensal);


    this.ngOnInit();

  }
  onSubmit() {

    this.postProducao(this.formProd.value);
    this.formProd.reset();
  }




}
