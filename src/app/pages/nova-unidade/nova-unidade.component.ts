import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { api_unidades } from 'src/app/Constants/Urls';
import { IUnidade } from 'src/app/models/unidade.models';
import { ToastrService } from 'ngx-toastr';
import { UnidadesService } from 'src/app/services/unidades.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/*+json',
    Authorization: 'my-auth-token'
  })
};

@Component({
  selector: 'app-nova-unidade',
  templateUrl: './nova-unidade.component.html',
  styleUrls: ['./nova-unidade.component.css']
})
export class NovaUnidadeComponent implements OnInit {

  formUnidade!: FormGroup;
  unitt!: IUnidade;
  apiUrl = `${"https://localhost:7057/api/Unidades"}/${this.unidadeservice.getIdEdit().valueOf()}`;


  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private unidadeservice: UnidadesService) { }

  ngOnInit(): void {
    this.createForm(new IUnidade())
    this.router.navigate(['/unidades']);
    this.router.navigate(['/AddUnit']);

    if (this.unidadeservice.getIdEdit() > 0) {
      this.editar();
    } else {
      this.createForm(new IUnidade())
    }
  }


  createForm(UnidadePost: IUnidade) {
    this.formUnidade = new FormGroup({
      id: new FormControl(UnidadePost.id = this.unidadeservice.getIdEdit()),
      apelido: new FormControl(UnidadePost.apelido),
      local: new FormControl(UnidadePost.local),
      marca: new FormControl(UnidadePost.marca),
      modelo: new FormControl(UnidadePost.modelo),
      ativo: new FormControl(UnidadePost.ativo)
    })

  }


  public postUnidade(formUnidade: IUnidade): void {
    if (formUnidade.apelido === "" || formUnidade.local === "" || formUnidade.marca === "" || formUnidade.modelo === "") {
      this.showError();
    } else {
      this.http.post<IUnidade>(api_unidades, formUnidade).subscribe();
    }
    this.unidadeservice.setIdEdit(0);

  }

  public putUnidade(formUnidade: IUnidade): any {
    if (formUnidade.apelido === "" || formUnidade.local === "" || formUnidade.marca === "" || formUnidade.modelo === "") {
      this.showError();
    } else {



      this.unidadeservice.PutUnidades( formUnidade).subscribe();

    }
    this.unidadeservice.setIdEdit(0);

  }



  editar() {
    this.unidadeservice.PegarPeloId(this.unidadeservice.getIdEdit()).subscribe(resposta => {
      this.unitt = resposta;
      this.createForm(this.unitt);



    });


  }


  onSubmit() {

    if (this.formUnidade.value.apelido === "" && this.formUnidade.value.local === "" && this.formUnidade.value.marca === "" && this.formUnidade.value.modelo === "") {
      this.showError()
      this.ngOnInit();
    } else if (this.unidadeservice.getIdEdit() === 0) {
      if (this.formUnidade.value.Ativo === null) {
        this.formUnidade.value.Ativo = false;
      }

      this.postUnidade(this.formUnidade.value);
      this.showSuccess();
      this.formUnidade.reset();
      this.ngOnInit();

    } else if (this.unidadeservice.getIdEdit() > 0) {
      this.putUnidade(this.formUnidade.value);
      console.log(this.unidadeservice.getIdEdit());

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









