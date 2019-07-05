import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { routerTransition } from 'src/app/router.animations';
import { Visit } from 'src/app/models/visit';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
  animations: [routerTransition()]
})
export class VisitsComponent implements OnInit {

  collapedSideBar: boolean;
  detailId: any;
  ticketDetailSub: any;
  visitDetailSub: any;
  ticketItem: Ticket;
  visits: Visit;

  constructor(
    private projectAPI: ProjectService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.detailId = this.route.snapshot.paramMap.get('id')
      let number = parseInt(this.detailId)
      if (!number){
          alert("Hey not a valid route")
          this.goBack()
      } else {
        this.ticketDetailSub = this.projectAPI.getticketDetails(number).subscribe(data=>{
          this.ticketItem = data
          console.log(this.ticketItem.ticket_id)
        })
        this.visitDetailSub = this.projectAPI.getVisits(number).subscribe(data=>{
          this.visits = data.results
        })
      }
  }  

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  goBack(){
    this.location.back()
  } 

}
