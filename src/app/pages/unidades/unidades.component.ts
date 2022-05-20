import { Component, OnInit } from '@angular/core';
import { IUnidade } from 'src/app/models/unidade.models';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {

  public unidadesFiltradas: IUnidade[] = [];
  public Unidades: any = [];
  private ListaDeUnidades: string = '';

  constructor( private unidadeservice : CrudService) { }

  ngOnInit(): void {
    console.log('ngOnInit');

    this.buscarUnidades();
  }


  public get FiltroLista(): string {
    return this.ListaDeUnidades;
  }

  public set FiltroLista(value: string) {
    this.ListaDeUnidades = value;
    this.unidadesFiltradas = this.ListaDeUnidades ?
      this.filtrarItens(this.ListaDeUnidades) :
      this.Unidades;
  }

  filtrarItens(FiltrarPor: string): any {
    FiltrarPor = FiltrarPor.toLocaleLowerCase();
    return this.Unidades.filter((Unidades: { Apelido: string }) =>
      Unidades.Apelido.toLocaleLowerCase().indexOf(FiltrarPor) !== -1
    );
  }


  buscarUnidades() {
    this.unidadeservice
      .GetUnidades()
      .subscribe((resposta: IUnidade[]) => {
        this.Unidades = resposta;
        this.unidadesFiltradas = this.Unidades;
      });
  }



}
