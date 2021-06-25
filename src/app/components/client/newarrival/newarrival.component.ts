import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import {WishlistProductService} from 'src/app/services/wishlist-product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-newarrival',
  templateUrl: './newarrival.component.html',
  styleUrls: ['./newarrival.component.scss']
})
export class NewarrivalComponent implements OnInit {
newArrivals:IProduct[]=[];
  constructor(private newarrival:ProductService,private whishlistservice:WishlistProductService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    stagePadding:310,
    margin:0,
    autoplayTimeout: 3000,
		autoplayHoverPause: true,
    dots: false,
    autoplay:true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        stagePadding: 50,
        items: 1 
      },
      400: {
        stagePadding: 50,
        items: 2
      },
      760: {
        stagePadding: 50,
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }
  ngOnInit(): void {
    this.getAllNewArrival();
  }
getAllNewArrival()
{
   this.newarrival.getNewArrivalProduct(8).subscribe(
     data=>
     {
       this.newArrivals=data;
     },
    errors=>
    {
       return errors;
    }
   )
}

addToWishist(productid:number)
{
  this.whishlistservice.addWishlistProduct(productid).subscribe
  (
    data=>
    {
      console.log(data);
      console.log(productid);
    },
    error=>
    {
      console.log(error);
    }
  )
}
}
