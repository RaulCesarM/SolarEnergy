import { Component, Input, OnInit } from '@angular/core';
import { IUnidade } from 'src/app/models/unidade.models';
import { UnidadesService } from 'src/app/services/unidades.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Unidades: IUnidade[] = [];
  UnidadesAtivas: number =0;
  UnidadesTotal!: number;
  UnidadesInativas!: number; 
  MediaEnergia!: number;
  TotalKilowatts!: number;

  constructor(private unidadeservice: UnidadesService) { }

  ngOnInit(): void {
    this.MediaEnergia = 0;; 
    this.showUnits();
    this.showBalance(); 
    
  }

  showUnits(){
    this.unidadeservice.GetUnidades().subscribe(resposta => {
      this.Unidades = resposta;
      this.UnidadesAtivas = this.Unidades.filter((Unidades:  { Ativo: boolean }) => Unidades.Ativo === true).length;
      this.UnidadesInativas = (this.Unidades.length - this.UnidadesAtivas);
      this.UnidadesTotal = this.Unidades.length;
      
    });
    
  }

  showBalance(){
    this.unidadeservice.GetRegistros().subscribe((response: any) => {
      this.TotalKilowatts = response;
      let vetor = Object.values(response);
      let soma = 0;
      for (let i = 0; i < vetor.length - 1; i++) {
        soma += vetor[i] as any;
        console.log(soma);
      }
      let med = (soma / this.UnidadesAtivas)
      this.MediaEnergia = med;
    });
    
  }

}
