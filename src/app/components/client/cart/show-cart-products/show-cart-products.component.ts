import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/Classes/CartProduct';
import { CartProductService } from 'src/app/services/cart-product.service';
import { WishlistProductService } from 'src/app/services/wishlist-product.service';

@Component({
  selector: 'app-show-cart-products',
  templateUrl: './show-cart-products.component.html',
  styleUrls: ['./show-cart-products.component.scss']
})
export class ShowCartProductsComponent implements OnInit {

  constructor(private cartsevice:CartProductService,private wishlistServicr:WishlistProductService) {
    console.log(this.cartProducts)
   }
  cartProducts:CartProduct[]=[];
  cartid="e2622172-be88-4483-8585-6649a8f956c2";
  mmsgerr="";
  ngOnInit(): void {
    this.cartsevice.getAllCartProduct(this.cartid).subscribe(
      data=>
      {
        this.cartProducts=data;
        console.log(this.cartProducts)
        console.log(data)
      },
    error=>
    {
      this.mmsgerr=error;
    }
      
    )
  }

  delteCartProduct(cartProductID:number)
  {
    console.log(cartProductID);
    this.cartsevice.deleteCartProduct(cartProductID).subscribe(
      error=>
      {
         return error;
      }
      
    )
    this.ngOnInit();
  }

  addToWishlist(productid:number)
  {
    this.wishlistServicr.addWishlistProduct(productid).subscribe(
      error=>
      {
         return error;
      }
    )

  }

} 
