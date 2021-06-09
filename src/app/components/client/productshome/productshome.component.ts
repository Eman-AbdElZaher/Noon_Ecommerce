import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.scss']
})
export class ProductshomeComponent implements OnInit {
  productList:IProduct[]=[];
  errorMsg="";
  constructor(private serviceProduct:ProductService) { }

  ngOnInit(): void {
    this.serviceProduct.refreshNeeded$.subscribe(()=>{
      this.getallProduct()
    })
    this.getallProduct();
  }
getallProduct()
{
  this.serviceProduct.getAllProduct().subscribe(
      products=>
      {
         this.productList=products;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  
}
}
