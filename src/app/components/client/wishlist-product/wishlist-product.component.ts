import { Component, OnInit } from '@angular/core';
import { CartProductService } from 'src/app/services/cart-product.service';

@Component({
  selector: 'app-wishlist-product',
  templateUrl: './wishlist-product.component.html',
  styleUrls: ['./wishlist-product.component.scss']
})
export class WishlistProductComponent implements OnInit {

  constructor(private cartService:CartProductService ) { }

  ngOnInit(): void {
  }

  addToCart(ProductId:number)
  {
    console.log(ProductId);
    this.cartService.addCartProduct(ProductId).subscribe(
      data=>
      {
        console.log(data);
      },
      error=>
      {
        console.log(error.message);
        
      }
      
    )
  }

}
