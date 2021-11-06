// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }     nous permet de cree les liens : path ligne et import alert

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlerteComponent} from './alerte/alerte.component';
import {OperationComponent} from './operation/operation.component';
const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: '/alerte' },
  { path: 'alerte',component:AlerteComponent },
 { path: 'operation',component:OperationComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
