import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { api_unidades } from 'src/app/Constants/Urls';
import { IUnidade } from 'src/app/models/unidade.models';
import { ToastrService } from 'ngx-toastr';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-nova-unidade',
  templateUrl: './nova-unidade.component.html',
  styleUrls: ['./nova-unidade.component.css']
})
export class NovaUnidadeComponent implements OnInit {

  formUnidade!: FormGroup;
  unitt!: IUnidade;
 


  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private unidadeservice: UnidadesService) { }

  ngOnInit(): void {
    this.createForm(new IUnidade())    
    this.router.navigate(['/unidades']);
    this.router.navigate(['/AddUnit']);
    
    if(this.unidadeservice.getIdEdit() > 0){      
    this.editar();
    }else{
      this.createForm(new IUnidade())
    }    
  }


  createForm(UnidadePost: IUnidade) {
    this.formUnidade = new FormGroup({      
      Apelido: new FormControl(UnidadePost.Apelido),
      Local: new FormControl(UnidadePost.Local),
      Marca: new FormControl(UnidadePost.Marca),
      Modelo: new FormControl(UnidadePost.Modelo),
      Ativo: new FormControl(UnidadePost.Ativo)
    })

  }
  

  public postUnidade(formUnidade: IUnidade): void {
    if(formUnidade.Apelido === "" || formUnidade.Local === "" || formUnidade.Marca === "" || formUnidade.Modelo === ""){
      this.showError();
    }else{
      this.http.post<IUnidade>(api_unidades, formUnidade).subscribe();
    }
    this.unidadeservice.setIdEdit(0);

  }

  public putUnidade(formUnidade: IUnidade): void {
    if(formUnidade.Apelido === "" || formUnidade.Local === "" || formUnidade.Marca === "" || formUnidade.Modelo === ""){
      this.showError();
    }else{
      this.http.put<IUnidade>(api_unidades + '/' + this.unidadeservice.getIdEdit(), formUnidade).subscribe();
    }
    this.unidadeservice.setIdEdit(0);

  }

  editar(){    
    this.unidadeservice.PegarPeloId(this.unidadeservice.getIdEdit()).subscribe(resposta => {
      this.unitt = resposta;     
      this.createForm(this.unitt);      

    });


  }


  onSubmit() {

    if (this.formUnidade.value.Apelido === "" && this.formUnidade.value.Local === "" && this.formUnidade.value.Marca === "" && this.formUnidade.value.Modelo === "") {
      this.showError()
      this.ngOnInit();
    } else if(this.unidadeservice.getIdEdit() === 0){
      if (this.formUnidade.value.Ativo === null){
        this.formUnidade.value.Ativo = false;
      }
      
      this.postUnidade(this.formUnidade.value);
      this.showSuccess();
      this.formUnidade.reset(); 
      this.ngOnInit();    

    }else if(this.unidadeservice.getIdEdit() > 0){
      this.putUnidade(this.formUnidade.value);
      this.showEdit();
      this.formUnidade.reset();
      this.router.navigate(['/unidades']); 
        

    }

  }

  cancelar() {
    this.router.navigate(['/unidades']);
    this.unidadeservice.setIdEdit(0);
  }

  showEdit() {
    this.toastr.success('Unidade editada com sucesso!', 'Editado!');
  }
  showSuccess() {
    this.toastr.success('Unidade cadastrada com sucesso!', 'Cadastrado!');
  }
  showError() {
    this.toastr.error('Preencha todos os campos!', 'Erro!');
  }

}
