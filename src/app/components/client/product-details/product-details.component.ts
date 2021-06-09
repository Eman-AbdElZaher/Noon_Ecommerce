import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  productId:number;
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute,private cartService:CartProductService) { }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.productId=parseInt(params.get('id'));
    })
//this.productID
    this.productservice.getProductById(2).subscribe(
      data=>
      {
        this.product=data;
        console.log(data);
        console.log("local"+this.product);

      },
      error=>
      {
        return error;
      }
    )
    console.log("local"+this.product);
    console.log(this.productId);

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
