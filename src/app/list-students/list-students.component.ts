import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css'],
})
export class ListStudentsComponent implements OnInit {
  public students: any;

  constructor(private _myservice: StudentService) {}

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents() {
    this._myservice.getStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (err) => console.error(err),
      () => console.log('finish loading')
    );
  }
  onDelete(studentId: string) {
    this._myservice.deleteStudent(studentId);
  }
}
