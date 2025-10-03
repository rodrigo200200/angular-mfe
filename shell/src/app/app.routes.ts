import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/cadastro',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './CadastroModule'
    }).then(m => m.CadastroModule)
    .catch(err => {
      console.error('❌ Erro ao carregar MFE Cadastro:', err);
      // Fallback para página de erro
      throw err;
    })
  },
  {
    path: 'sucesso',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './SucessoModule'
    }).then(m => m.SucessoModule)
    .catch(err => {
      console.error('❌ Erro ao carregar MFE Sucesso:', err);
      // Fallback para página de erro
      throw err;
    })
  },
  {
    path: 'error',
    loadComponent: () => import('./components/error/error-page.component').then(m => m.ErrorPageComponent)
  },
  {
    path: 'status',
    loadComponent: () => import('./components/status/status-dashboard.component').then(m => m.StatusDashboardComponent)
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];
