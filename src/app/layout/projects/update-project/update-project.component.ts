import { Component, OnInit, OnDestroy} from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from 'src/app/models/project';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit, OnDestroy{

  projectItemToUpdate= this.projectAPI.proUpdateData;
  
  projectForm: FormGroup;

  group: FormControl;
  site_name:  FormControl;  
  country:  FormControl;
  state:  FormControl;
  district:  FormControl;
  city:  FormControl;
  sector:  FormControl;
  address:  FormControl;
  po:  FormControl;
  po_date:  FormControl;
  po_type:  FormControl;
  handled_by:  FormControl;
  project_id:  FormControl;
  source:  FormControl;
  invoice_date: FormControl;
  invoice_no: FormControl;
  warranty_date: FormControl;
  error:any;
  update:boolean=false;

  dataSource  = [];
  listsub: any;
  slistsub: any;
  constructor(
    private projectAPI: ProjectService,
    private router: Router,
    public datepipe: DatePipe,
    public dialogbox: MatDialogRef<UpdateProjectComponent>,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit() {
    if(this.projectItemToUpdate){
      this.update=true
      
    }
    this.setUpFormData()
  }
  setUpFormData(){
    let group = ""
    let site_name = ""
    let  country = ""
    let  state = ""
    let  district = ""
    let  city = ""
    let  sector = ""
    let  address = ""
    let  po = ""
    let  po_date = ""
    let  po_type = ""
    let  handled_by = ""
    let  project_id = ""
    let  source = ""
    let  invoice_date = ""
    let  invoice_no = ""
    let  warranty_date = ""
    
    if (this.projectItemToUpdate){
      group = this.projectItemToUpdate.group.group_name
      site_name = this.projectItemToUpdate.site_name.site_name
      sector = this.projectItemToUpdate.sector
      country = this.projectItemToUpdate.country.country_name
      state = this.projectItemToUpdate.state.state_name
      district = this.projectItemToUpdate.district.district_name
      city = this.projectItemToUpdate.city.city_name
      address = this.projectItemToUpdate.address
      po = this.projectItemToUpdate.po
      po_date = this.projectItemToUpdate.po_date
      po_type = this.projectItemToUpdate.po_type
      handled_by = this.projectItemToUpdate.handled_by
      project_id = this.projectItemToUpdate.project_id
      source = this.projectItemToUpdate.source
      invoice_date = this.projectItemToUpdate.invoice_date
      invoice_no = this.projectItemToUpdate.invoice_no

      let war_date = new Date(this.projectItemToUpdate.warranty_date)
      let w_date=new Date(invoice_date);
      warranty_date = (war_date.getMonth()-w_date.getMonth()).toString()
    }
    
    this.group  = new FormControl(group)
    this.site_name= new FormControl(site_name)  
    this.country= new FormControl(country)
    this.state= new FormControl(state)
    this.district= new FormControl(district)
    this.city= new FormControl(city)
    this.sector= new FormControl(sector)
    this.address= new FormControl(address)
    this.po= new FormControl(po)
    this.po_date= new FormControl(po_date)
    this.po_type= new FormControl(po_type)
    this.handled_by= new FormControl(handled_by)
    this.project_id= new FormControl(project_id)
    this.source= new FormControl(source)
    this.invoice_date= new FormControl(invoice_date)
    this.invoice_no= new FormControl(invoice_no)
    this.warranty_date= new FormControl(warranty_date)

    this.projectForm = new FormGroup({
        'group': this.group,
        'site_name': this.site_name,
        'country': this.country,
        'state': this.state,
        'district': this.district,
        'city': this.city,
        'sector': this.sector,
        'address': this.address,
        'po': this.po,
        'po_date': this.po_date,
        'po_type': this.po_type,
        'handled_by': this.handled_by,
        'project_id': this.project_id,
        'source': this.source,
        'invoice_date': this.invoice_date,
        'invoice_no': this.invoice_no,
        'warranty_date': this.warranty_date,
    })
  }

  ngOnDestroy(){
    if (this.listsub){
      this.listsub.unsubscribe()
      this.slistsub.unsubscribe()
    }
  }

  onUpdate() {
    this.projectAPI.projectUpdate(this.projectForm.value, this.projectItemToUpdate.id).subscribe(
      data=>{console.log('Success')
      error=>console.error('Error', this.error) } 
    )
    this.projectAPI.filter('click');
  }

  cancel(){
    this.dialogbox.close();
    this.projectAPI.filter('');
  }
  
}
