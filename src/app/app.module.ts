import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LogonComponent } from './pages/logon/logon.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ContentComponent } from './components/content/content.component';
import { NovaUnidadeComponent } from './pages/nova-unidade/nova-unidade.component';
import { CadastroProducaoComponent } from './pages/cadastro-producao/cadastro-producao.component';
import { UnidadesComponent } from './pages/unidades/unidades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




const routes: Routes = [

 
  // { path: 'logon', component: LogonComponent },
  // // { path: '**', redirectTo: '' },
  { path: 'cadastro', component: CadastroProducaoComponent },
  { path: 'sidebar', component: SideBarComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'unidades', component: UnidadesComponent },
  { path: 'AddUnit', component: NovaUnidadeComponent },
 


];

@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    DashboardComponent,
    SideBarComponent,
    NavbarComponent,
    ContentComponent,
    NovaUnidadeComponent,
    CadastroProducaoComponent,
    UnidadesComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


