import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,

  ],

  providers: [StudentService],

  exports: [RouterModule]


})
export class AppRoutingModule { }
