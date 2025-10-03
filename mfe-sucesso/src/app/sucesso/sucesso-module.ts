import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { SucessoRoutingModule } from './sucesso-routing-module';
import { Sucesso } from './sucesso';

@NgModule({
  imports: [
    CommonModule,
    SucessoRoutingModule,
    Sucesso
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SucessoModule { }
