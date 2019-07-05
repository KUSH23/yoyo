import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { MatDialog, MatDialogConfig } from '@angular/material';

import {ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Group } from '../../models/group';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { MatSnackBar } from '@angular/material';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [routerTransition()]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  collapedSideBar: boolean;
  // projects:Project[] = [];
  CurrentDate : Date = new Date();

  projects:any;
  orders:any;
  pdata:any;
  odata:any;
  fdata:any;
  kdata:any;
  projectListSub:any;
  orderListSub:any;
  refreshCount = 0
  id:number;
  oid:Order[]=[];
  CreateForm: boolean=false;
  expand: boolean=false;
  change: boolean=false;
  
  constructor(
    private projectAPI: ProjectService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    ) { 
      this.projectAPI.listen().subscribe((m:any)=>{
        console.log(m);
        this.getData();
      })
    }

  ngOnInit() {
    this.getData()
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  getData(){
    this.projectListSub = this.projectAPI.list().subscribe(data=>{
      this.projects = data // as [projects]
      this.pdata = this.projects
      this.fdata= this.projects
    })
    this.orderListSub = this.projectAPI.orderlist().subscribe(data=>{
      this.orders = data 
      this.odata = this.orders
    })
  }

  ngOnDestroy(){
    if (this.projectListSub){
      this.projectListSub.unsubscribe();
    }
    if (this.orderListSub){
      this.orderListSub.unsubscribe()
    }
  }

  editForm(updateItem:Project){
    this.projectAPI.proUpdateData=updateItem;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(UpdateProjectComponent, dialogConfig);
  }

  ondelete(id:number){
    if(confirm('Are you sure to delete??')){
      this.projectAPI.deletePro(id).subscribe(data=>{
        this.getData();
        this.snackBar.open('Deleted', '', {
          duration:5000,
          verticalPosition:'bottom',
        });
      });
      
    }
   
  }
  toggle(x:boolean){
    if(x==false){
      x=true;
    }else{
      x=false;
    }
    return x;
  }
  showDetails(id: number){
    this.id=id;
    if(this.id=id){
      this.expand=true;
      this.change=this.toggle(this.change);
    }
  }

  isActive(project:Project){
    let wdate=new Date(project.warranty_date);
    return wdate.getTime() > this.CurrentDate.getTime();
  }

  applyFilter(filtervalue: string){
    // if(this.kdata){
    //   this.pdata= this.kdata;
    // }
    if(filtervalue.trim().length == 0){
      this.fdata= this.pdata
      this.kdata = this.pdata;
      return this.projects= this.pdata;
    }
    // this.projects.filter = filtervalue.trim().toLocaleLowerCase();   
    this.projects= this.pdata.filter(function(item){
      let lower = String(filtervalue).toLowerCase();
      let value = (
                  item.group.group_name.toLowerCase().indexOf(lower) > -1 
                  || item.site_name.site_name.toLowerCase().indexOf(lower) > -1 
                  || item.po.toLowerCase().indexOf(lower) > -1 
                  || item.project_id.toLowerCase().indexOf(lower) > -1 
                  || item.country.country_name.toLowerCase().indexOf(lower) > -1
                  || String(item.id).toLowerCase().indexOf(lower) > -1
                  )
      return value
    })
    
    this.fdata= this.projects
  }

  applyFilt(filtervalue: string){
    if(filtervalue.trim().length == 0){
      this.projects= this.fdata;
      
      return this.orders= this.odata;
    }
    // this.projects.filter = filtervalue.trim().toLocaleLowerCase();   
    this.orders= this.odata.filter(function(item){
      let lower = String(filtervalue).toLowerCase();
      let value = (
                   item.order_details.toLowerCase().indexOf(lower) > -1 
                  || item.warranty_type.toLowerCase().indexOf(lower) > -1 
                  || item.product_code.toLowerCase().indexOf(lower) > -1 
                  || item.serial_no.toLowerCase().indexOf(lower) > -1
                  )
      
      return value
    })
    let cid=[]
    for(let ord of this.orders){
      if(!(ord.project in this.oid)){
        cid.push(ord.project);
      }
    }
    this.oid=cid;

    if(this.oid){
      let d =[]
      let id 
      for(id of this.oid){
        if(!(id in d)){
        this.projects= this.fdata.filter(function(item){
          let value = String(item.id).toLowerCase().indexOf(id) > -1
          return value
        })
        d.push(this.projects[0]);
        }
      }
      this.projects=d;
      // this.kdata = this.projects;
    }

  }

  exportAsXLSX():void {
    this.projectAPI.exportAsExcelFile(this.projects, 'sample');
  }

}
