import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/Classes/Product';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistProductService } from 'src/app/services/wishlist-product.service';
declare var $:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  public  product :Product={id:0,name:"",averageRating:0,brandID:0,color:"",description:"",mainImage:"",price:0,quantity:0,size:"",subCategoryID:0,supplierID:0};
  public productId:number;
  reviewsNumber:number=0;
  isLoading:boolean=true;
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute,private cartService:CartProductService,private whislistservice:WishlistProductService) { 
    console.log(this.product)
  }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.productId=parseInt(params.get('id'));
    })
 
    this.productservice.getProductById(this.productId).subscribe(
      data=>
      {
        this.product=data;
        this.isLoading=false;
        console.log(data);
        console.log(this.product);

      },
      error=>
      {
        return error;
      }
    )
    console.log("local"+this.product);
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
  addToWishist(productid:number)
  {
    this.whislistservice.addWishlistProduct(productid).subscribe
    (
      data=>
      {
        console.log(data)
      },
      error=>
      {
        console.log(error)
      }
    )
  }
  ngAfterViewInit(){
    $(document).ready(function(){
      $(document).ready(function () {
        $(function () {
          $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
        });
      });
    })}

}
