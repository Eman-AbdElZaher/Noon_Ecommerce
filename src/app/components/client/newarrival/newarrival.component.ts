import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import {WishlistProductService} from 'src/app/services/wishlist-product.service';
@Component({
  selector: 'app-newarrival',
  templateUrl: './newarrival.component.html',
  styleUrls: ['./newarrival.component.scss']
})
export class NewarrivalComponent implements OnInit {
newArrivals:IProduct[]=[];
  constructor(private newarrival:ProductService,private whishlistservice:WishlistProductService) { }

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
