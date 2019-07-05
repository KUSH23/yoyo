import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { POC } from 'src/app/models/poc';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-poc-create',
  templateUrl: './poc-create.component.html',
  styleUrls: ['./poc-create.component.scss']
})
export class PocCreateComponent implements OnInit {

  listsub: any;
  message:Project;
  poc: POC;

  PocForm: FormGroup;

  project:  FormControl;
  site_name:  FormControl;
  poc_name:  FormControl;
  mobile_1:  FormControl;
  mobile_2:  FormControl;
  email:  FormControl;
  department:  FormControl;
  designation:  FormControl;
  
  constructor(
    private projectAPI: ProjectService,
    private router: Router,
    public dialogbox: MatDialogRef<PocCreateComponent>,
    private snackBar:MatSnackBar,
  ) { 
    this.projectAPI.listen().subscribe((m:any)=>{
      console.log(m);
      this.projectAPI.list().subscribe(data=>{
      })
      this.projectAPI.getpropoc(this.message.id).subscribe(data=>{
      })
    })
  }

  ngOnInit() {
    this.message = this.projectAPI.message

    this.project= new FormControl(this.message.id)
    this.site_name= new FormControl(this.message.site_name.site_name)
    this.poc_name= new FormControl('')
    this.mobile_1= new FormControl('')
    this.mobile_2= new FormControl('')
    this.email= new FormControl('')
    this.department= new FormControl('')
    this.designation= new FormControl('')

    this.PocForm = new FormGroup({
      'project': this.project,
      'site_name': this.site_name,
      'poc_name': this.poc_name,
      'mobile_1': this.mobile_1,
      'mobile_2': this.mobile_2,
      'email': this.email,
      'department': this.department,
      'designation': this.designation
    })
  }

  Submit() {
    this.projectAPI.PocPost(this.PocForm.value).subscribe(
      data=>console.log('Success', data),
      error=>console.error('Error', error)
    )
    this.projectAPI.filter('click');
  }

  cancel(){
    this.dialogbox.close();
    this.projectAPI.filter('');
  }
}
