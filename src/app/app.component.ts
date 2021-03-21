import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

export type EditorType = 'name' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Students App';
  //declare variable to hold response and make it public to be accessible from components.html
  public students: any;
  //initialize the call using StudentService
  constructor(private _myService: StudentService) {}
  ngOnInit() {
    this.getStudents();
  }
  //method called OnInit
  getStudents() {
    this._myService.getStudents().subscribe(
      //read data and assign to public variable students
      (data) => {
        this.students = data;
      },
      (err) => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(studentId: string) {
    this._myService.deleteStudent(studentId);
  }
  editor: EditorType = 'profile';

  get showProfileEditor() {
    return this.editor === 'profile';
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
