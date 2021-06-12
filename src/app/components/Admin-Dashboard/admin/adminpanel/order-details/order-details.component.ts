import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {OrderDetails} from 'src/app/models/Classes/OrderDetails';
import{OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  errorMsg: any;


  constructor(private activatedRoute:ActivatedRoute,private Orderservice:OrderService) { }
  orderDetailsList:OrderDetails[]=[]; 
  // OrderList:Order[]=[];
  id:number; 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
    this.id=parseInt(params.get('id'));
 
    console.log( this.id)//for test
      this.Orderservice.getAllOrderDetailsByOrderID(this.id).subscribe(
       p=>{
         this.orderDetailsList=p;
         console.log("in "+p);//for test
         console.log(this.orderDetailsList)//for test
       },
       errorResponse=>
       {
        this.errorMsg=errorResponse;
       }
       )
     
    })
   }
 
  }



