import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common'

import { ProjectService } from '../../services/project.service';
import { Country } from '../../models/country'
import { State } from '../../models/state';
import { District } from '../../models/district';
import { City } from '../../models/city';
import { Group } from '../../models/group';
import {Site } from '../../models/site';
import { MatDialogRef, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss'],
  animations: [routerTransition()]
})
export class PlaceCreateComponent implements OnInit, OnDestroy {

  collapedSideBar: boolean;
  countries:Country[] =[]
  states: State[] =[]
  districts: District[] =[]
  cities: City[] =[]
  groups: Group[] =[]
  sites: Site[] =[]
  listsub: any;
  slistsub: any;

  CountryForm: FormGroup;
  StateForm: FormGroup;
  DistrictForm: FormGroup;
  CityForm: FormGroup;

  country_name:  FormControl;
  country:  FormControl;
  state_name:  FormControl;
  state:  FormControl;
  district_name:  FormControl;
  district:  FormControl;
  city_name:  FormControl;
  GroupForm: FormGroup;
  SiteForm: FormGroup;

  group_name:  FormControl;
  group_prefix:  FormControl;
  group:  FormControl;
  site_name:  FormControl;
  
  str : string;

  constructor(
    private projectAPI: ProjectService,
    private router: Router,
    private location: Location,
    public dialogbox: MatDialogRef<PlaceCreateComponent>,
    private snackBar:MatSnackBar,
  ) {
    this.projectAPI.listen().subscribe((m:any)=>{
      console.log(m);
      this.projectAPI.getGroups().subscribe(
        data => this.groups = data
      );
      this.projectAPI.getCountries().subscribe(
        data => {
          this.countries = data;
        }
      );
    })
  }

  ngOnInit() {
    this.listsub = this.projectAPI.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
    this.slistsub = this.projectAPI.getGroups().subscribe(
      data => this.groups = data
    );  

    // this.str === this.projectAPI.addstr;

    this.country_name= new FormControl('')
    this.country= new FormControl('')
    this.state_name= new FormControl('')
    this.state= new FormControl('')
    this.district_name= new FormControl('')
    this.district= new FormControl('')
    this.city_name= new FormControl('')
    this.group_name= new FormControl('')
    this.group_prefix= new FormControl('')
    this.group= new FormControl('')
    this.site_name= new FormControl('')

    this.CountryForm = new FormGroup({
      'country_name': this.country_name
    })

    this.StateForm = new FormGroup({
      'country': this.country,
      'state_name': this.state_name
    })

    this.DistrictForm = new FormGroup({
      'country': this.country,
      'state': this.state,
      'district_name': this.district_name
    })

    this.CityForm = new FormGroup({
      'country': this.country,
      'state': this.state,
      'district': this.district,
      'city_name': this.city_name
    })

    this.GroupForm = new FormGroup({
      'group_name': this.group_name,
      'group_prefix': this.group_prefix
    })

    this.SiteForm = new FormGroup({
      'group': this.group,
      'site_name': this.site_name
    })
    
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
    this.projectAPI.addCountries(this.CountryForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error',error);
      this.projectAPI.filter('click');
      
      })
    
  }
  onStateSubmit(){
    this.projectAPI.addStates(this.StateForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', error);
      this.projectAPI.filter('click');} 
    )
    
  }
  onDistrictSubmit(){
    this.projectAPI.addDistricts(this.DistrictForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', error);
      this.projectAPI.filter('click');} 
    )
    
  }
  onCitySubmit(){
    this.projectAPI.addCities(this.CityForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', error);
      this.projectAPI.filter('click');} 
    )
    
  }
  
  onGroupSubmit(){
    this.projectAPI.addGroups(this.GroupForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', error);
      this.projectAPI.filter('click');
    } 
    )
    
  }
  onSiteSubmit(){
    this.projectAPI.addSites(this.SiteForm.value).subscribe(
      data=>{this.snackBar.open('Success', "", {
        duration:5000,
        verticalPosition:'bottom',
      });
      error=>console.error('Error', error);
      this.projectAPI.filter('click');} 
    )
    
  }

  cancel(){
    this.projectAPI.filter('k');
    this.dialogbox.close();
    
  }

  onChangeGroup(groupId: number) {
    if (groupId) {
      this.listsub = this.projectAPI.getSites(groupId).subscribe(
        data => this.sites = data
      );
    } else {
      this.sites = null;
    }
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this.listsub = this.projectAPI.getStates(countryId).subscribe(
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

  onChangeState(stateId: number) {
    if (stateId) {
      this.listsub = this.projectAPI.getDistricts(stateId).subscribe(
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

  onChangeDistrict(districtId: number) {
    if (districtId) {
      this.listsub = this.projectAPI.getCities(districtId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }
}
