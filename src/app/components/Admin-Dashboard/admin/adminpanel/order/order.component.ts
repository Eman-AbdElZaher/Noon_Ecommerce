import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Order} from 'src/app/models/Classes/Order';
import{OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 order=new Order (0,'','',0);
  //errorMsg="";
 OrderList:Order[]=[];

  constructor(private orderService:OrderService) { }

 
  ngOnInit(): void {
    this.orderService.refreshNeeded$.subscribe(()=>{
      this.GetAllOrders();
    })
    this.GetAllOrders();
    this.reserform();
  }
  GetAllOrders(){
    this.orderService.getAllOrders().subscribe(
      serviceData=>
      {
        this.OrderList=serviceData;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  
    reserform(form? : NgForm){
      if(form !=null)
        form.reset();
      this.order= {
        id:0,
        userID:'',
        orderDate:'',
        totalPrice:0
      }
    }
    errorMsg='';

}
