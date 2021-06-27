import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/models/Classes/Cart';
import { CartProduct } from 'src/app/models/Classes/CartProduct';
import { Product } from 'src/app/models/Classes/Product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartProductService } from 'src/app/services/cart-product.service';
import { CartService } from 'src/app/services/cart.service';
import{OrderService} from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public Products: Product[] = [];
  public cart:Cart={userID:"",totalPrice:0};
  Isvaild:Boolean=false;
  cartProducts: CartProduct[] = [];
  cartid :string//"237a4ada-8333--ada0-32d689c0527f";
  mmsgerr = "";
  count:number;
  constructor(private AuthService:AuthenticationService,private ffb:FormBuilder,private productservice: ProductService,private cartservice:CartService,private orderService:OrderService,private cartProductsevice: CartProductService) {

   }
  PayForm=this.ffb.group(
    {
    UserName: ['', [Validators.required]],
    CardNumber:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
    CVV:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    ExpireMonth:['',Validators.required],
    ExpireYear:['',Validators.required],

    }
    );

  ngOnInit(): void {
    this.cartid=this.AuthService.getUserId();
    this.getCartProducts();

    this.cartservice.getCart(this.cartid).subscribe(
      data=>
      {
        this.cart=data;
        console.log(data)
      }
    )
  } 
  getCartProducts() {
    this.cartProductsevice.getAllCartProduct(this.cartid).subscribe(
      data => {
        this.cartProducts = data;
        this.count=data.length;

        data.forEach(element => {
          this.getProduct(element.productId);

        });

      },
      error => {
        this.mmsgerr = error;
      }

    )

  } 
  getProduct(productId: number) {
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
  get UserName ()
  {
    return this.PayForm.get('UserName');
  }
  get CardNumber ()
  {
    return this.PayForm.get('CardNumber');
  }
  get CVV ()
  {
    return this.PayForm.get('CVV');
  }
  get  ExpireMonth ()
  {
    return this.PayForm.get('ExpireMonth');
  }
  get ExpireYear()
  {
    return this.PayForm.get('ExpireYear');
  }
  CheckOut()
  {
    // if(confirm('Are you sure'))
    // {
    this.orderService.CheckoutOrder().subscribe(
     data=>{console.log(data);
      this.Isvaild=true;
      localStorage.setItem('count',JSON.stringify(0));
     }
    )
    
    // }
  }

}
