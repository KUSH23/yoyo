import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common'
import {MatCalendar} from '@angular/material/datepicker';
// import {NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Country } from '../../../models/country';
import { State } from '../../../models/state';
import { District } from '../../../models/district';
import { City } from '../../../models/city';
import { Group } from '../../../models/group';
import {Site } from '../../../models/site';
import { PlaceCreateComponent } from '../../place-create/place-create.component';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  animations: [routerTransition()]
})
export class ProjectCreateComponent implements OnInit, OnDestroy{

  collapedSideBar: boolean;

  countries:Country[] =[]
  states: State[] =[]
  districts: District[] =[]
  cities: City[] =[]
  groups: Group[] =[]
  sites: Site[] =[]

  error:any;
  dataSource  = [];
  listsub: any;
  slistsub: any;

  groupid: number;
  countryid: number;
  stateid: number;
  districtid: number;

  projectForm = new FormGroup({
    group: new FormControl(''),
    site_name: new FormControl(''),
    sector: new FormControl(''),   
    country: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    po: new FormControl(''),
    po_date: new FormControl(''),
    po_type: new FormControl(''),
    handled_by: new FormControl(''),
    project_id: new FormControl(''),
    source: new FormControl(''),
    invoice_no: new FormControl(''),
    invoice_date: new FormControl(''),
    warranty_date: new FormControl(''),

  });


  constructor(
    private projectAPI: ProjectService,
    private router: Router,
    public datepipe: DatePipe,
    private location: Location,
    private dialog:MatDialog,
    // public dialogbox: MatDialogRef<ProjectCreateComponent>,
    private snackBar:MatSnackBar,
    ) { } 

  ngOnInit() {
    this.listsub = this.projectAPI.getCountries().subscribe(
      data => this.countries = data
    );
    this.slistsub = this.projectAPI.getGroups().subscribe(
      data => this.groups = data
    );
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }


  ngOnDestroy(){
    if (this.listsub){
      this.listsub.unsubscribe()
      this.slistsub.unsubscribe()
    }
  }
  
  onSubmit() {
    console.log(this.projectForm.value)
    this.projectAPI.projectPost(this.projectForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', this.error)
      this.projectAPI.filter('click');
      this.cancel();
    })
  }

  onChangeGroup(groupid: number) {
    this.groupid=groupid;
    if (this.groupid) {
      this.listsub = this.projectAPI.getSites(this.groupid).subscribe(
        data => {
          this.sites = data
        }
      );
    } else {
      this.sites = null;
    }
  }

  onChangeCountry(countryid:number) {
    this.countryid=countryid;
    if (this.countryid) {
      this.listsub = this.projectAPI.getStates(this.countryid).subscribe(
        data => {
          this.states = data;
          this.districts = null;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.districts = null;
      this.cities = null;
    }
  }

  onChangeState(stateid: number) {
    this.stateid=stateid;
    if (this.stateid) {
      this.listsub = this.projectAPI.getDistricts(this.stateid).subscribe(
        data => {
          this.districts = data;
          this.cities = null;
        }
      );
    } else {
      this.districts = null;
      this.cities = null;
    }
  }

  onChangeDistrict(districtid: number) {
    this.districtid=districtid;
    if (this.districtid) {
      this.listsub = this.projectAPI.getCities(this.districtid).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  cancel(){
    this.router.navigate(['/d/projects'])
    this.projectAPI.filter('');
 }

 addForm(str: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="40%";
    let dialogRef:MatDialogRef<PlaceCreateComponent> = this.dialog.open(PlaceCreateComponent, dialogConfig);
    dialogRef.componentInstance.str = str;
    dialogRef.afterClosed().subscribe(result => {
      this.projectAPI.getGroups().subscribe(
        data => this.groups = data
      );
      this.projectAPI.getCountries().subscribe(
        data => this.countries = data
      );
      if (this.groupid) {
        this.listsub = this.projectAPI.getSites(this.groupid).subscribe(
          data => {
            this.sites = data
          }
        );
      } 
    
    if (this.countryid) {
      this.listsub = this.projectAPI.getStates(this.countryid).subscribe(
        data => {
          this.states = data;
        }
      );
    }

    if (this.stateid) {
      this.listsub = this.projectAPI.getDistricts(this.stateid).subscribe(
        data => {
          this.districts = data;
        }
      );
    } 

    if (this.districtid) {
      this.listsub = this.projectAPI.getCities(this.districtid).subscribe(
        data => this.cities = data
      );
    } 
    });
  }
}
