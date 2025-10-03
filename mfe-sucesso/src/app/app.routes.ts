import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sucesso/sucesso-module').then(m => m.SucessoModule)
  }
];
