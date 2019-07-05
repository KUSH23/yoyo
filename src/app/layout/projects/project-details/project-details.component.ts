import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { routerTransition } from '../../../router.animations';

import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Product } from '../../../models/product';
import { POC } from '../../../models/poc';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { OrderCreateComponent } from '../../order-create/order-create.component';
import { PocCreateComponent } from '../../poc-create/poc-create.component';
import { Ticket } from 'src/app/models/ticket';
import { TicketsComponent } from '../../tickets/tickets.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  animations: [routerTransition()]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy{
  detailId: any;
  projectItem: Project;
  orders: Product[]=[];
  pocs: POC;
  tickets: Ticket[]=[];
  projectDetailSub: any;
  orderlistsub: any;
  poclistsub: any;
  ticketlistsub: any;
  collapedSideBar: boolean;
  
  id:number;
  expand: boolean=false;
  change: boolean=false;
  showOrder: boolean = false;
  UpdateForm: boolean=false;

  @Input() projectItemToExpand: Project;
  @Output() messageEvent = new EventEmitter<Project>();
  message: Project;

  constructor(
    private projectAPI: ProjectService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    ) {
      this.projectAPI.listen().subscribe((m:any)=>{
        console.log(m);
        this.projectAPI.getprorder().subscribe(data=>{
        })
        this.orderlistsub = this.projectAPI.orderlist().subscribe(data=>{
        })
        this.ticketlistsub = this.projectAPI.getprticket(this.projectItem.id).subscribe(data=>{
          this.tickets  = data
        })
        this.poclistsub = this.projectAPI.getpropoc(this.projectItem.id).subscribe(data=>{
          this.pocs  = data
        })
      })
     }

  ngOnInit() {
    if(this.projectItemToExpand){
      this.projectItem=this.projectItemToExpand;
      this.poclistsub = this.projectAPI.getpropoc(this.projectItem.id).subscribe(data=>{
        error=>console.error(error); 
        this.pocs  = data
      })
      this.ticketlistsub = this.projectAPI.getprticket(this.projectItem.id).subscribe(data=>{
        error=>console.error(error); 
        this.tickets  = data
       
      })
    }else{
    this.detailId = this.route.snapshot.paramMap.get('id')
      let number = parseInt(this.detailId)
      if (!number){
          alert("Hey not a valid route")
          this.goBack()
      } else {
        this.projectDetailSub = this.projectAPI.get(number).subscribe(data=>{
          this.projectItem = data
          this.message=data;
        })
        this.orderlistsub = this.projectAPI.getprorder(number).subscribe(data=>{
          this.orders  = data
        })
        this.poclistsub = this.projectAPI.getpropoc(number).subscribe(data=>{
          error=>console.error(error); 
          this.pocs  = data
        })
        this.ticketlistsub = this.projectAPI.getprticket(number).subscribe(data=>{
          error=>console.error(error); 
          this.tickets  = data
        })
      }
    }  
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
  ngOnDestroy(){
    if (this.projectDetailSub){
      this.projectDetailSub.unsubscribe()
      this.orderlistsub.unsubscribe()
      this.ticketlistsub.unsubscribe()
    }
  }

  goBack(){
      this.location.back()
  }
  
  sendMessage(message:Project) {
    this.projectAPI.message = message;
  }

  show(){
    // this.showOrder=true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(OrderCreateComponent, dialogConfig);
  }

  addPOC(){
    // this.showOrder=true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(PocCreateComponent, dialogConfig);
  }

  addTicketP(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(TicketsComponent, dialogConfig);
  }

  showUpdateForm(){
    this.UpdateForm=true;
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

  ondelete(id:number){
    if(confirm('Are you sure to delete??')){
      this.projectAPI.deleteorder(id).subscribe(data=>{
        this.orderlistsub = this.projectAPI.orderlist().subscribe(data=>{
        })
        this.projectAPI.filter('');
        this.snackBar.open('Deleted', '', {
          duration:5000,
          verticalPosition:'bottom',
        });
      });
      
    }
  }

  deletePoc(id:number){
    if(confirm('Are you sure to delete??')){
      this.projectAPI.deletepoc(id).subscribe(data=>{
        this.poclistsub = this.projectAPI.getpropoc(this.projectItem.id).subscribe(data=>{
        })
        this.projectAPI.filter('');
        this.snackBar.open('Deleted', '', {
          duration:5000,
          verticalPosition:'bottom',
        });
      });
      
    }
  }
}
