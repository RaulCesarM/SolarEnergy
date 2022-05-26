import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { api_Registro } from 'src/app/Constants/Urls';
import { Registro } from 'src/app/models/RegistroProd';
import { UnidadesService } from 'src/app/services/unidades.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  Balance?: any;
  ShowChart = false; 

    constructor(private http: HttpClient,
      private unidadeService: UnidadesService ) { }
  ngOnInit(){
    this.unidadeService.GetRegistros().subscribe((response: any ) => {
      this.Balance = response;
      const  dataArray: any[] = [];
      const dataLabel: any[] = [];
      let vetor = Object.values(response);
      let labelVetor = Object.keys(response);
      for (let i = 0; i < vetor.length -1; i++) {
       dataArray.push(vetor[i] as any); 
        dataLabel.push(labelVetor[i] as any);     
      }
      this.barChartData.datasets[0].data = dataArray;
      this.barChartData.labels = dataLabel;
      this.ShowChart = true;
    });
  }
 
  barChartData = {
    labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    datasets: [{
      label: 'Produção Mensal',
      data: [0,0,0,0,0,0,0,0,0,0,0,0],
      fill: true,
      borderColor: '#000',
      pointBorderColor: '#000',
      tension: 0.4
    }]
  };

 
}
