import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cadastro/cadastro-module').then(m => m.CadastroModule)
  }
];
