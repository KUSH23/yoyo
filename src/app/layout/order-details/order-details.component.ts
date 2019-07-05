import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { routerTransition } from '../../router.animations';

import { ProjectService } from '../../services/project.service';
import { Order } from '../../models/order';
import { Product } from 'src/app/models/product';
import { Ticket } from 'src/app/models/ticket';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TicketsComponent } from '../tickets/tickets.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  animations: [routerTransition()]
})
export class OrderDetailsComponent implements OnInit, OnDestroy{

  detailId: any;
  orderItem: Product;
  orderlistsub: any;

  @Input() OrderItemToExpand: Product;

  tickets: Ticket[]=[];
  ticketlistsub: any;

  constructor(
    private projectAPI: ProjectService,
    private location: Location,
    private route: ActivatedRoute,
    private dialog:MatDialog,
    ) {
      this.projectAPI.listen().subscribe((m:any)=>{
        console.log(m);
        this.ticketlistsub = this.projectAPI.getodticket(this.OrderItemToExpand.id).subscribe(data=>{
          this.tickets  = data
        })
      })
     }

  ngOnInit() {
    if(this.OrderItemToExpand){
      this.orderItem=this.OrderItemToExpand;
      this.ticketlistsub = this.projectAPI.getodticket(this.OrderItemToExpand.id).subscribe(data=>{
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
        this.orderlistsub = this.projectAPI.getorders(number).subscribe(data=>{
          this.orderItem  = data
          console.log(this.orderItem)
        })
        this.ticketlistsub = this.projectAPI.getprticket(number).subscribe(data=>{
          error=>console.error(error); 
          this.tickets  = data
        })
      }
    }
  }
  ngOnDestroy(){
    if (this.orderlistsub){
      this.orderlistsub.unsubscribe()
    }
  }

  goBack(){
      this.location.back()
  }

  sendMessage(message:Product) {
    this.projectAPI.message = message;
  }
  
  addTicketP(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%";
    this.dialog.open(TicketsComponent, dialogConfig);
  }

}
