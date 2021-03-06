import { Component, OnInit } from '@angular/core';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { Cart } from 'src/app/models/Classes/Cart';
import { CartProduct } from 'src/app/models/Classes/CartProduct';
import { Product } from 'src/app/models/Classes/Product';
import { BrandService } from 'src/app/services/brand.service';
import { CartProductService } from 'src/app/services/cart-product.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistProductService } from 'src/app/services/wishlist-product.service';
import{OrderService} from 'src/app/services/order.service';
import { ConditionalExpr } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-cart-products',
  templateUrl: './show-cart-products.component.html',
  styleUrls: ['./show-cart-products.component.scss']
})
export class ShowCartProductsComponent implements OnInit {
  public Products: Product[] = [];
  public Brands:Ibrand[]=[];
  public cart:Cart={userID:"",totalPrice:0};
  isLoading:boolean=true;
  
  
  constructor(private AuthService:AuthenticationService, private brandService:BrandService, private cartProductsevice: CartProductService, private wishlistServicr: WishlistProductService, private productservice: ProductService,private cartservice:CartService,private orderService:OrderService) {
    console.log(this.cartProducts)
  }
  cartProducts: CartProduct[] = [];
  cartid:string; //= "a8433eac-5dc1-4041-8972-8f5fd930fb6c";//this.cart.userID;//
  mmsgerr = "";
  public disable:boolean=false;
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
        if(this.cartProducts.length==0)
        {
          this.disable=true;
        }
        this.isLoading=false;
        data.forEach(element => {
          this.getProduct(element.productId);

        });
      },
      error => {
        this.mmsgerr = error;
      }

    )

  }

  getBrnd(brandId:number)
  {
    console.log(brandId);
    this.brandService.getBrandById(brandId).subscribe(
      data => {
       
            if(this.Brands.length==0)
            {
              this.Brands.push(data);
              console.log("frist time")
            }
            else 
            {
              this.Brands.forEach(b=>
                {
                  if(data.name!=b.name)
                  {
                    this.Brands.push(data);
              console.log("second time")
                  }
                })
              
            }
           
        
      },
      error => {
        return error;
      }
    )
  }
  getProduct(productId: number) {
    console.log(productId)
    this.productservice.getProductById(productId).subscribe(
      data => {
        this.Products.push(data);
        console.log("brand id "+data.brandID)
        this.getBrnd(data.brandID)
      },
      error => {
        return error;
      }
    )
    
    
  }
  delteCartProduct(cartProductID: number) {
    console.log(cartProductID);
    this.cartProductsevice.deleteCartProduct(cartProductID).subscribe(
      error => {
        return error;
      }

    )
    
  }

  addToWishlist(productid: number) {
    this.wishlistServicr.addWishlistProduct(productid).subscribe(
      error => {
        return error;
      }
    )

  }
  CheckOut()
  {
    if(confirm('Are you sure'))
    {
    this.orderService.CheckoutOrder().subscribe(
     data=>{console.log(data);

     }
    )
    }
  }


  counter(i: number) {
    return new Array(i);
  }

 
  updateCartProductQuintity(ProductID:number,newQuintity:number)
  {
    this.cartProductsevice.getCartProductById(ProductID).subscribe(
      data=>
      {
        data.quintity=newQuintity;
        this.cartProductsevice.updateCartProduct(data).subscribe(
          data=>
          {
            console.log(data);
          }
        )
      }
    )
  }

  clearCart(cartID:string)
  {
    this.cartservice.ClearCart(cartID).subscribe(

      error => {
        return error;
      }
    )
    localStorage.setItem('count',JSON.stringify(0));
  }

}
