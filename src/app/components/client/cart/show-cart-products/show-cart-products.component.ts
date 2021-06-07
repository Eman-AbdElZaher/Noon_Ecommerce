import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/Classes/CartProduct';
import { CartProductService } from 'src/app/services/cart-product.service';

@Component({
  selector: 'app-show-cart-products',
  templateUrl: './show-cart-products.component.html',
  styleUrls: ['./show-cart-products.component.scss']
})
export class ShowCartProductsComponent implements OnInit {

  constructor(private cartsevice:CartProductService) {
    console.log(this.cartProducts)
   }
  cartProducts:CartProduct[]=[];
  cartid="a03fce4b-a211-4abb-8b41-9f89a467968d";
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

}
