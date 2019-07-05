import { Component, OnInit, OnDestroy,Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Product } from '../../models/product';
import { MatDialogRef } from '@angular/material';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit, OnDestroy {
  

  listsub: any;
  message:Project;
  product: Product;

  OrderForm: FormGroup;

  project:  FormControl;
  order_details:  FormControl;
  warranty:  FormControl;
  warranty_type:  FormControl;
  product_code:  FormControl;
  serial_no:  FormControl;
  comments:  FormControl;
  
  @Output() doneCreate = new EventEmitter<boolean>();
  
  constructor(
    private location: Location,
    private projectAPI: ProjectService,
    private router: Router,
    public dialogbox: MatDialogRef<OrderCreateComponent>,
  ) {
    this.projectAPI.listen().subscribe((m:any)=>{
      console.log(m);
      this.projectAPI.getprorder(this.message.id).subscribe(data=>{
      })
    })
   }

  ngOnInit() {
    this.message = this.projectAPI.message

    this.project= new FormControl(this.message.id)
    this.order_details= new FormControl('')
    this.warranty= new FormControl('')
    this.warranty_type= new FormControl('')
    this.product_code= new FormControl('')
    this.serial_no= new FormControl('')
    this.comments= new FormControl('')

    this.OrderForm = new FormGroup({
      'project': this.project,
      'order_details': this.order_details,
      'warranty': this.warranty,
      'warranty_type': this.warranty_type,
      'product_code': this.product_code,
      'serial_no': this.serial_no,
      'comments': this.comments
    })
  }

  ngOnDestroy(){
    if (this.listsub){
      this.listsub.unsubscribe()
    }
  }

  onSubmit() {
    console.log(this.OrderForm.value)
    this.projectAPI.orderPost(this.OrderForm.value).subscribe(
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
