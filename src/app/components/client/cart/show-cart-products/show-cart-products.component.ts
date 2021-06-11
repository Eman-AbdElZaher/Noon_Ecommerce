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

@Component({
  selector: 'app-show-cart-products',
  templateUrl: './show-cart-products.component.html',
  styleUrls: ['./show-cart-products.component.scss']
})
export class ShowCartProductsComponent implements OnInit {
  public Products: Product[] = [];
  public Brands:Ibrand[]=[];
  public cart:Cart={userID:"",totalPrice:0};
  constructor(private brandService:BrandService, private cartsevice: CartProductService, private wishlistServicr: WishlistProductService, private productservice: ProductService,private cartservice:CartService,private orderService:OrderService) {
    console.log(this.cartProducts)
  }
  cartProducts: CartProduct[] = [];
  cartid = "e092a660-b913-453b-a3be-f1e6f3eca47b";
  mmsgerr = "";
  ngOnInit(): void {

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
    this.cartsevice.getAllCartProduct(this.cartid).subscribe(
      data => {
        this.cartProducts = data;

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
        this.Brands.forEach(brand=>{
          if(brand.id!=data.id)
          {
            this.Brands.push(data);
            console.log(data)
          }
        })
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
        this.getBrnd(data.brandID)
      },
      error => {
        return error;
      }
    )
    
    
  }
  delteCartProduct(cartProductID: number) {
    console.log(cartProductID);
    this.cartsevice.deleteCartProduct(cartProductID).subscribe(
      error => {
        return error;
      }

    )
    this.ngOnInit();
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

}
