import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sucesso } from './sucesso';

const routes: Routes = [
  {
    path: '',
    component: Sucesso
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucessoRoutingModule { }
