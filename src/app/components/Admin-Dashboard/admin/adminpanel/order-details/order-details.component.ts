import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CartProduct } from 'src/app/models/Classes/CartProduct';
import { Product } from 'src/app/models/Classes/Product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {OrderDetails} from 'src/app/models/Classes/OrderDetails';
import{OrderService} from 'src/app/services/order.service';
import { CartProductService } from 'src/app/services/cart-product.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import{UserService} from 'src/app/services/user.service';
import {Cart} from 'src/app/models/Classes/Cart';
import { Order } from 'src/app/models/Classes/Order';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  errorMsg: any;
  order=new Order (0,'','',0);
  orderId:number;


  constructor(private activatedRoute:ActivatedRoute,private orderservice:OrderService,private cartProductsevice: CartProductService, private productservice: ProductService,private cartservice:CartService) { }
  orderDetailsList:OrderDetails[]=[];
  public Products: Product[] = []; 
  cartProducts: CartProduct[] = [];
  public cart:Cart={userID:"",totalPrice:0};
  cartid = "d4a62c76-1ca4-41e7-ba6a-65af5a84d1fb";//this.cart.userID;//
  mmsgerr = "";
  // pro:Product= {
  //   id:0,  
  //   name:'',
  //   description:'',
  //   quantity:0,
  //   price:0,
  //   color:'', 
  //   size:'',
  //   subCategoryID:1,
  //   brandID:0,
  //   supplierID:0,
  //  averageRating:0,
  //  mainImage:''
  // }
  id:number; 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
    this.id=parseInt(params.get('id'));
 
    console.log( this.id)//for test
      this.orderservice.getAllOrderDetailsByOrderID(this.id).subscribe(
       data=>{
         this.orderDetailsList=data;
        //  console.log("in "+p);//for test
        //  console.log(this.orderDetailsList)//for test
        data.forEach(element => {
                  this.getProduct(element.productID);
        
                });          
       },
       errorResponse=>
       {
        this.errorMsg=errorResponse;
       }
       )
     
    });
    this.getOrder(this.id);
    // this.getCartProducts();
   }
  //  getCartProducts() {

  //   this.cartProductsevice.getAllCartProduct(this.cartid).subscribe(
  //     data => {
  //       this.cartProducts = data;

  //       data.forEach(element => {
  //         this.getProduct(element.productId);

  //       });

  //     },
  //     error => {
  //       this.mmsgerr = error;
  //     }

  //   )
  // }
  getProduct(productId:number) {
    console.log(productId)
    this.productservice.getProductById(productId).subscribe(
      data => {
        this.Products.push(data);
      },
      error => {
        return error;
      }
    )
  }
  getOrder(OrderId:number) {
    console.log(OrderId)
    this.orderservice.getOrderbyID(OrderId).subscribe(
      data => {
        this.order=data;
        console.log(data);

      },
      error => {
        return error;
      }
    )
  }


  }



