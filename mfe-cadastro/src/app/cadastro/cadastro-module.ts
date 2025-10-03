import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { CadastroRoutingModule } from './cadastro-routing-module';
import { Cadastro } from './cadastro';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CadastroRoutingModule,
    Cadastro
  ],
  providers: [
    provideHttpClient()
  ]
})
export class CadastroModule { }
