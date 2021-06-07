import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cartproduct-details',
  templateUrl: './cartproduct-details.component.html',
  styleUrls: ['./cartproduct-details.component.scss']
})
export class CartproductDetailsComponent implements OnInit {

  product: IProduct;
  productId:number;
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.productId=parseInt(params.get('id'));
    })

    this.productservice.getProductById(this.productId).subscribe(
      data=>
      {
        this.product=data;
        console.log(data);
      },
      error=>
      {
        return error;
      }
    )
    console.log(this.product);
    console.log(this.productId);

  
  }
  
  
}
