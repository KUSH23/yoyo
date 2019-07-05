import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Product } from 'src/app/models/product';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket';
import { MatDialogRef } from '@angular/material';
import { Order } from 'src/app/models/order';
import { SalesManager } from 'src/app/models/salesManager';
import { Engineer } from 'src/app/models/engineer';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  animations: [routerTransition()]
})
export class TicketsComponent implements OnInit {

  collapedSideBar: boolean;

  listsub: any;
  slistsub: any;

  message:any;
  omessage:Product;

  TicketForm: FormGroup;

  project:  FormControl;
  order:  FormControl;
  status:  FormControl;
  comments:  FormControl;
  ticket_id:  FormControl;
  request_type: FormControl;
  source: FormControl;
  sales_manager: FormControl;
  engineer: FormControl;
  scheduled_date: FormControl;
  start_date: FormControl;
  stop_date: FormControl;

  salesManagers: SalesManager[]=[]
  engineers: Engineer[]=[]
  requests=['complaint', 'service', 'site survey', 'installation'];
  statuses=['in progress', 'closed', 'on hold'];
  
  @Output() doneCreate = new EventEmitter<boolean>();
  
  constructor(
    private projectAPI: ProjectService,
    private location: Location,
    public dialogbox: MatDialogRef<TicketsComponent>,
  ) { }

  ngOnInit() {

    this.listsub = this.projectAPI.getSalesManager().subscribe(
      data => this.salesManagers = data
    );
    this.slistsub = this.projectAPI.getEngineer().subscribe(
      data => this.engineers = data
    );

    this.message = this.projectAPI.message
    console.log(this.message.id)

    if(this.message.project){
      this.project= new FormControl(this.message.project)
      this.order= new FormControl(this.message.id)
    }else{
      this.project= new FormControl(this.message.id)
      this.order= new FormControl('')
    }
    
    this.status= new FormControl('')
    this.ticket_id= new FormControl('')
    this.comments= new FormControl('')
    this.request_type= new FormControl('')
    this.source= new FormControl('')
    this.sales_manager= new FormControl('')
    this.engineer= new FormControl('')
    this.scheduled_date= new FormControl('')
    this.start_date= new FormControl('')
    this.stop_date= new FormControl('')

    this.TicketForm = new FormGroup({
      'project': this.project,
      'order': this.order,
      'status': this.status,
      'comments': this.comments,
      'ticket_id': this.ticket_id,
      'request_type': this.request_type,
      'source': this.source,
      'sales_manager': this.sales_manager,
      'engineer': this.engineer,
      'scheduled_date': this.scheduled_date,
      'start_date': this.start_date,
      'stop_date': this.stop_date
    })
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  onSubmit() {
    console.log(this.TicketForm.value)
    this.projectAPI.ticketPost(this.TicketForm.value).subscribe(
      data=>console.log('Success', data),
      error=>console.error('Error', error)
    )
    this.projectAPI.filter('click');
  }

  goBack(){
    this.location.back()
  }

  cancel(){
    this.dialogbox.close();
    this.projectAPI.filter('');
  }

}
