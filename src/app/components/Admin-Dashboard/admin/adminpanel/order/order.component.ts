import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Order} from 'src/app/models/Classes/Order';
import{OrderService} from 'src/app/services/order.service';
import {UserService } from 'src/app/services/user.service';
import {Iuser} from 'src/app/models/Interfaces/iuser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 order=new Order (0,'','',0);
  //errorMsg="";
 OrderList:Order[]=[];
 User:Iuser= {
  userName:"",
  email:"",
  password:"",
  confirmpassword:""
}

  constructor(private orderService:OrderService,private userservice:UserService) { }
  
 
  ngOnInit(): void {
    // this.orderService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllOrders();
    // })
    this.GetAllOrders();
    this.reserform();
  }
  GetAllOrders(){
    this.orderService.getAllOrders().subscribe(
      serviceData=>
      {
        this.OrderList=serviceData;
      
      serviceData.forEach(element => {
        this.getUserByid(element.userID);
        // serviceData=this.getUserByid(userID)

      });
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
    getUserByid(userID:string) {

      this.userservice.getUserByid(userID).subscribe(
        data => {
          this.User=data;
          console.log(data);
        },
        error => {
          return error;
        }
      )
    }
  

}
