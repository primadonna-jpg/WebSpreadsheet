import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { SpreadsheetListComponent } from './spreadsheet-list/spreadsheet-list.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'alert', component:AlertComponent},
  {path: 'spreadsheetList', component:SpreadsheetListComponent},
  {path: 'spreadsheet/:id', component:SpreadsheetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
