import { Component, OnInit, Output,  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUnidade } from 'src/app/models/unidade.models';
import { UnidadesService } from 'src/app/services/unidades.service';





@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit {
  

  unidadesFiltradas: IUnidade[] = [];
  Unidades: IUnidade[] = [];
  private ListaDeUnidades: string = '';
  pag: number = 1;
  contador: number = 5;
  idEditar?: number;

  

 

  constructor(
    private unidadeservice: UnidadesService,
    private toastr: ToastrService,
    private router: Router) {
            }
  

  ngOnInit(): void {

    this.unidadeservice.GetUnidades().subscribe(resposta => {
      this.Unidades = resposta;
      this.unidadesFiltradas = this.Unidades;
    }); 
    

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

  

  ExcluirUnidade(id: number) {
    this.unidadeservice.ExcluirUnidade(id).subscribe((resultado) => {     
      this.showDelete();
      this.ngOnInit();
    });
  }

  editarUnidade(id: number) {
    
      this.unidadeservice.setIdEdit(id);
      this.router.navigate(['/AddUnit']);
     
    
  }

  showDelete() {
    this.toastr.success('Unidade excluida com sucesso!', 'Excluida!');
  }






}






