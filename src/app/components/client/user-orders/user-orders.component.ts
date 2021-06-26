import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Order } from 'src/app/models/Classes/Order';
import { OrderDetails } from 'src/app/models/Classes/OrderDetails';
import { Iuser } from 'src/app/models/Interfaces/iuser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  UserOrders: Order[] = [];
  OrdersDetails:OrderDetails[] = [];
  userid:string;
  orderid:number;
  quantity:number=0;
  q:any[]=[];
  c:number=0;
  User:Iuser= {
    userName:"",
    email:"",
    password:"",
    confirmpassword:""
  }
  

  
  constructor(private orderservice:OrderService,private AuthService:AuthenticationService, private userservice:UserService) { }

  ngOnInit(): void {
    this.userid=this.AuthService.getUserId();
    this.getUserByid(this.userid);
    this.GetAllOrdersbyuser();
     
  }

  GetAllOrdersbyuser(){

    this.orderservice.getAllOrdersByUserID(this.userid).subscribe(
     data => {
   this.UserOrders = data;
   data.forEach(element => {
    this.getallorderdetails(element.id);
   
  

  });
     },
    error => {console.log(error)}
     );
    
  }
  getallorderdetails(orderr:number)
  {
    this.orderservice.getAllOrderDetailsByOrderID(orderr).subscribe(
      data => {
        
    this.OrdersDetails = data;
    console.log(this.OrdersDetails);
    ;
      // for (let i=0;i<this.OrdersDetails.length;i++)
      // {

      //    this.quantity+=this.OrdersDetails[i].quantity;

      // }
      data.forEach(element=>{
        this.quantity+=element.quantity;
      })
      var snapshot:any = {
              orderd: orderr,
              qty: this.quantity
           }
        
      
   
      this.q.push(snapshot);
       
      console.log(this.quantity);
      this.quantity=0;
    //  this.q[this.c]=this.quantity;
     
    //  this.c=this.c+1;ng ng serng ng    


     
   

  //  for(let j=0;j<this.UserOrders.length;j++) 
  //  {
  //    this.quantity=0;
  //   for(let i=0;i<this.OrdersDetails.length;i++)
  //   {
  //     this.quantity+=this.OrdersDetails[i].quantity;
  //     this.q[i]=this.quantity;
  //   }
  // }
      },
     error => {console.log(error)}
      );

  }
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
