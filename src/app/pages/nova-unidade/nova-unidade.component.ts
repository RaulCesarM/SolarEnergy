import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { api_unidades } from 'src/app/Constants/Urls';
import { IUnidade } from 'src/app/models/unidade.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nova-unidade',
  templateUrl: './nova-unidade.component.html',
  styleUrls: ['./nova-unidade.component.css']
})
export class NovaUnidadeComponent implements OnInit {

  formUnidade!: FormGroup;


  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm(new IUnidade())
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
  showSuccess() {
    this.toastr.success('Unidade cadastrada com sucesso!', 'Sucesso!');
  }
  showError() {
    this.toastr.error('Preencha todos os campos!', 'Erro!');
  }

  public postUnidade(formUnidade: IUnidade): void {
    this.http.post<IUnidade>(api_unidades, formUnidade).subscribe();
  }

  onSubmit() {

    if (this.formUnidade.value.Apelido === "" && this.formUnidade.value.Local === "" && this.formUnidade.value.Marca === "" && this.formUnidade.value.Modelo === "") {
      this.showError()
    } else {
      this.postUnidade(this.formUnidade.value);
      this.showSuccess();
      this.formUnidade.reset();
      this.router.navigate(['/dash']);
      this.router.navigate(['/unidades']);

    }


  }






}
