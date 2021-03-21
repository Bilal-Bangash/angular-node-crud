import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { citiesZipCodes } from '../shared/cities_zip';
import { StudentService } from '../student.service';



@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})


//SECTION 1
export class ProfileEditorComponent implements OnInit {
  @Input() contactName: string = '';
  @Input() contactJobTitle: string = '';
  // cities zip codes
  private citiesZipCodes = citiesZipCodes;
  public mode = 'Add';
  private id: any;
  private student: any;
  // getters
  get Address(){
    return this.profileForm.get('address');
  }

  get Organizationzip(){
    return this.Address?.get('organizationzip');
  }
  get Organizationcity(){
    return this.Address?.get('organizationcity');
  }
  get Address2(){
    return this.Address?.get('address');
  }
  get Zip(){
    return this.Address2?.get('zip');
  }
  get City(){
    return this.Address2?.get('city');
  }

  public profileForm = this.fb.group({
    contactName: new FormControl('', Validators.required),
    contactJobTitle: new FormControl('', Validators.required),
    contactEmail: new FormControl(''),
    contactPhone: new FormControl(''),
    address: this.fb.group({
      organizationname: new FormControl(''),
      organizationaddress: new FormControl(''),
      Organizationwebsite: new FormControl(''),
      organizationzip: new FormControl(''),
      organizationcity: new FormControl(''),
      address: this.fb.group({
        address1: new FormControl(''),
        address2: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl(''),
        city: new FormControl(''),
      })
    }),
    //SECTION 2
    studentaddress: this.fb.group({
      projecttitle: [''],
      descriptionofproject: [''],
      skillrequirements: [''],
      duties: [''],
      benefits: [''],
      companyprovisions: [''],
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }
  constructor(private fb: FormBuilder,private _myService: StudentService,private router: Router,public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');
        //request student info based on the id
        this._myService.getStudent(this.id).subscribe(
          (data) => {
            //read data and assign to private variable student
            this.student = data;
            console.log('this.student',this.student);
            //populate the firstName and lastName on the page
            //notice that this is done through the two-way bindings
            this.contactName = this.student.firstName;
            this.contactJobTitle = this.student.lastName;
          },
          (err) => console.error(err),
          () => console.log('finished loading')
        );
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }


  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onClick() {
    console.log('select your zip')
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    console.log(this.fb.group(['address', 'address1']).value);
    console.log('You submitted: ' + this.contactName + ' ' + this.contactJobTitle);
    if (this.mode == 'Add')
    this._myService.addStudents(this.profileForm.get('contactName').value ,this.profileForm.get('contactJobTitle').value);
    if (this.mode == 'Edit')
    this._myService.updateStudent(this.id, this.contactName, this.contactJobTitle);
  this.router.navigate(['/listStudents']);
  }

  onChangeZip(e:any, element:any){
    let value = e.target.value;
    this.citiesZipCodes.filter(item=>{
      item.zip_codes.filter(item1=>{
        if(item1 == value){
          element?.setValue(item.city_name);
        }
      })
    })
  }
}



