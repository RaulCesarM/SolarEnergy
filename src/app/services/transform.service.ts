import { Injectable } from '@angular/core';
import { RegistroMensal } from '../models/RegistroMensal';


@Injectable({
  providedIn: 'root'
})
export class TransformService {

  data: String = "";
  valorDomes!: number;
  mensal!: RegistroMensal;
  idRegistro!:number;


  constructor() { }

  setData(Data: String) {
    this.data = Data;
  }

  setValorDomes(ValorDomes: number) {
    this.valorDomes = ValorDomes;
  }



  transform(): RegistroMensal {

    const Mes = this.data.substring(5, 7);

    if (Mes === "01") {
      this.mensal.janeiro +=  this.valorDomes;
    } else if (Mes === "02") {
      this.mensal.fevereiro +=  this.valorDomes;
    } else if (Mes === "03") {
      this.mensal.marco += this.valorDomes;
    } else if (Mes === "04") {
      this.mensal.abril +=  this.valorDomes;
    } else if (Mes === "05") {
      this.mensal.maio +=  this.valorDomes;
    } else if (Mes === "06") {
      this.mensal.junho +=  this.valorDomes;
    } else if (Mes === "07") {
      this.mensal.julho += this.valorDomes;
    } else if (Mes === "08") {
      this.mensal.agosto +=  this.valorDomes;
    } else if (Mes === "09") {
      this.mensal.setembro +=  this.valorDomes;
    } else if (Mes === "10") {
      this.mensal.outubro +=  this.valorDomes;
    } else if (Mes === "11") {
      this.mensal.novembro +=  this.valorDomes;
    } else if (Mes === "12") {
      this.mensal.dezembro +=  this.valorDomes;
    }
    this.mensal.idRegistro = 2;
    return this.mensal;

  }

}
