import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { routerTransition } from 'src/app/router.animations';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [routerTransition()]
})
export class ClientsComponent implements OnInit, OnDestroy {

  collapedSideBar: boolean;
  projects:any;
  count: number;
  data:any;
  groups:any;
  pdata:any;
  gdata:any;
  projectListSub:any;
  listsub: any;
  refreshCount = 0
  id:number;
  details: boolean=false;
  expand: boolean=false;
  change: boolean=false;
  
  constructor(
    private projectAPI: ProjectService,
  ) {
    this.projectAPI.listen().subscribe((m:any)=>{
      console.log(m);
      this.getData();
    })
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(){
    if (this.projectListSub){
      this.projectListSub.unsubscribe()
    }
    if (this.listsub){
      this.listsub.unsubscribe()
    }
  }

  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }

  getData(){
    this.projectListSub = this.projectAPI.getGroups().subscribe(data=>{
      this.groups = data
      this.gdata = this.groups
    })
  }

  back(){
    this.details=false;
  }

  toggle(x:boolean){
    if(x==false){
      x=true;
    }else{
      x=false;
    }
    return x;
  }

  show(id: number){
    if(id){
      this.details=true;
      this.listsub = this.projectAPI.getGroupsProjects(id).subscribe(data=>{
        this.projects = data
        this.pdata = this.projects
        console.log(data)
      })
    }
    // console.log("ss",this.data)
    // if(this.data){ 
    //   this.projects = this.data
    //   this.pdata = this.projects
    // }
  }

  showDetails(id: number){
      if(this.id=id){
        this.expand=true;
        this.change=this.toggle(this.change);
      }
  }

  applyFilter(filtervalue: string){
    if(filtervalue.trim().length == 0){
      return this.groups= this.gdata;
    }
    // this.projects.filter = filtervalue.trim().toLocaleLowerCase();   
    this.groups= this.gdata.filter(function(item){
      let lower = filtervalue.toLowerCase();
      let value = item.group_name.toLowerCase().indexOf(lower) > -1;
      return value
    }) 
  }

  applyFilt(filtervalue: string){
    if(filtervalue.trim().length == 0){
      return this.projects= this.pdata;
    }
    // this.projects.filter = filtervalue.trim().toLocaleLowerCase();   
    this.projects= this.pdata.filter(function(item){
      let lower = filtervalue.toLowerCase();
      let value = item.group.group_name.toLowerCase().indexOf(lower) > -1 || item.site_name.site_name.toLowerCase().indexOf(lower) > -1 ||
      item.po.toLowerCase().indexOf(lower) > -1 || item.project_id.toLowerCase().indexOf(lower) > -1
      return value
    })
  }
}
