import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Classes/Product';
import { wishListProduct } from 'src/app/models/Classes/whishListProduct';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistProductService } from 'src/app/services/wishlist-product.service';

@Component({
  selector: 'app-wishlist-product',
  templateUrl: './wishlist-product.component.html',
  styleUrls: ['./wishlist-product.component.scss']
})
export class WishlistProductComponent implements OnInit {
  public Products: Product[] = [];
  public wishlistProducts:wishListProduct[]=[];
  wishlistid = "d4a62c76-1ca4-41e7-ba6a-65af5a84d1fb";
  mmsgerr = "";
  constructor(private cartService:CartProductService ,private productservice:ProductService, private wishlistService:WishlistProductService) { }

  ngOnInit(): void {
    this.getWishlistProducts()
  }

  getWishlistProducts()
  {
    this.wishlistService.getAllWishlistProduct(this.wishlistid).subscribe(
      data => {
        this.wishlistProducts = data;
        console.log(data)
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

  deletewishlistProduct(wishlistProductID: number) {
    console.log(wishlistProductID);
    this.wishlistService.deleteWishlistProduct(wishlistProductID).subscribe(
      error => {
        return error;
      }

    )
    
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
