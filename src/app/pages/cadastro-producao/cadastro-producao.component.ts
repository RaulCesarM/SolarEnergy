
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  api_putRegistro } from 'src/app/Constants/Urls';
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
 
  Registro!: Registro;
  status:number | undefined
 

  Unidades: IUnidade[] = [];
  formProd!: FormGroup;
  constructor(
    private unidadeservice: UnidadesService,
    private transform: TransformService ) { }


  ngOnInit():any {    
   
    this.getUnidadesName();
    this.createForm(new Producao());  
    this.unidadeservice.GetRegistros().subscribe((response: any) => {
      this.transform.Mensal = response;
    });
   
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
  public postProducao(formProd: Producao ): void {    
    
    this.transform.setData(this.Data);
    this.transform.setValorDomes(formProd.TotalGerado);
    let Mensal = this.transform.transform();
    this.unidadeservice.PutProducao(api_putRegistro, Mensal ); 
 
    this.ngOnInit();

  }
  onSubmit() {
  
    this.postProducao(this.formProd.value);    
    this.formProd.reset();
  }




}
