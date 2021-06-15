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
  OrderCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 

  constructor(private orderService:OrderService) { }

 
  ngOnInit(): void {
    // this.orderService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllOrders();
    // })
    // this.GetAllOrders();
    this.getOrderCount();
    this.getSelectedPage(1);
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
    private getOrderCount(){
      this.orderService.getOrderCount().subscribe(
        data => {
          this.OrderCount = data;
          this.numberOfPages = Math.ceil(this.OrderCount / this.pageSize);
          console.log(this.numberOfPages);
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
    // pagination
    counter(i: number) {
      return new Array(i);
    }
    getSelectedPage(currentPageNumber:number){
      this.orderService.getOrderByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.OrderList= data;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          // if(data.length != 0)
          //   this.= true;
          // else
          //   this.hasOffers = false;
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }

}
