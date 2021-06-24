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
 names:string[];
  //errorMsg="";
 OrderList:Order[]=[];
 User:Iuser= {
  userName:"",
  email:"",
  password:"",
  confirmpassword:""
}
users:Iuser[]=[];

  constructor(private orderService:OrderService,private userservice:UserService) { }
  
 
  ngOnInit(): void {
    // this.orderService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllOrders();
    // })
    this.GetAllOrders();
 
    
  }
  GetAllOrders(){
    this.orderService.getAllOrders().subscribe(
data => {
this.OrderList = data
data.forEach(element => {

 this.userservice.getUserByid(element.userID).subscribe(
data => {this.users.push(data)},
error => {console.log(error)}
);


 });
},
error => {console.log(error)}
);
    
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
    getUsername(userID:string) {
      let name;
      this.userservice.getUserName(userID).subscribe(
        data => {
          name=data;
          console.log(data);
        },
        error => {
          return error;
        }
      )
      return name;
    }
}
