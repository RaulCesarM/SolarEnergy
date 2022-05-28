import { Injectable } from '@angular/core';
import { Registro } from '../models/RegistroProd';


@Injectable({
  providedIn: 'root'
})
export class TransformService {

  Data: String = "";
  valorDomes!: number;
  Mensal!: Registro;


  constructor() { }

  setData(Data: String) {
    this.Data = Data;
  }

  setValorDomes(valorDomes: number) {
    this.valorDomes = valorDomes;
  }



  transform(): Registro {
   
    const Mes = this.Data.substring(5, 7);

    if (Mes === "01") {
      this.Mensal.janeiro +=  this.valorDomes;
    } else if (Mes === "02") {
      this.Mensal.fevereiro +=  this.valorDomes;
    } else if (Mes === "03") {
      this.Mensal.marco += this.valorDomes;
    } else if (Mes === "04") {
      this.Mensal.abril +=  this.valorDomes;
    } else if (Mes === "05") {
      this.Mensal.maio +=  this.valorDomes;
    } else if (Mes === "06") {
      this.Mensal.junho +=  this.valorDomes;
    } else if (Mes === "07") {
      this.Mensal.julho += this.valorDomes;
    } else if (Mes === "08") {
      this.Mensal.agosto +=  this.valorDomes;
    } else if (Mes === "09") {
      this.Mensal.setembro +=  this.valorDomes;
    } else if (Mes === "10") {
     this.Mensal.outubro +=  this.valorDomes;
    } else if (Mes === "11") {
      this.Mensal.novembro +=  this.valorDomes;
    } else if (Mes === "12") {
      this.Mensal.dezembro +=  this.valorDomes;
    }   
   
    return this.Mensal;
   
  }

}
