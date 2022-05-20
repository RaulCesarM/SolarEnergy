import { Injectable } from '@angular/core';
import { IUnidade } from '../models/unidade.models';

@Injectable({
  providedIn: 'root'
})
export class UnidadesHelpService {

 



  constructor() { }

  // buscarTotalItensPedido(): number {
  //   return this.Unidades.length;
  // }

  // adicionarItemPedido(Unidade: IUnidade) {
  //   this.Unidades.push(Unidade);
  // }

  // adicionarItensPedido(item: Iproduto, quantidade: number) {
  //   const itens = Array(quantidade).fill(item);
  //   this.itensPedidoLista.push(...itens);

  //   console.log('itensPedidoLista', this.itensPedidoLista);
  // }

  // limparPedido() {
  //   this.itensPedidoLista = [];
  // }

  // removerItemPedido(id: number) {
  //   const itemIndex = this.itensPedidoLista.findIndex((item) => item.id === id)
  //   this.itensPedidoLista.splice(itemIndex, 1);
  // }

  // buscarItensPedido(): Iproduto[] {
  //   return this.itensPedidoLista;
  // }
}
