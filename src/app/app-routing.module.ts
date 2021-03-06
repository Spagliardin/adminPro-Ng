import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
]



@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
