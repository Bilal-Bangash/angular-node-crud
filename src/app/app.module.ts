import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { StudentService } from './student.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListStudentsComponent } from './list-students/list-students.component';

const appRoutes: Routes = [
  {
    path: '', //default component to display
    component: ListStudentsComponent,
  },
  {
    path: 'addProfile', //default component to display
    component: ProfileEditorComponent,
  },
  {
    path: 'editStudent/:_id', //when students edited
    component: ProfileEditorComponent,
  },

  {
    path: 'listStudents', //when students listed
    component: ListStudentsComponent,
  },
  {
    path: '**', //when path cannot be found
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    ListStudentsComponent,
    ProfileEditorComponent
  ],
  imports: [
    BrowserModule,
    // other imports ...
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [StudentService],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
