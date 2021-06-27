import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productoffer',
  templateUrl: './productoffer.component.html',
  styleUrls: ['./productoffer.component.scss']
})
export class ProductofferComponent implements OnInit {
  productOfferList:IProduct[]=[];
  subCategoryId:number;
  offerValue:any;
  constructor(private productsevice:ProductService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.subCategoryId=parseInt(params.get('subcategoryid'));
      this.offerValue=parseInt(params.get('offervalue'));
    })
    this.gotoProduct();
    this.gotoProductCategory();
  }
 gotoProduct()
 {

   this.productsevice.getProductOfferBySubCategoryAndOfferValue(this.subCategoryId,this.offerValue)
   .subscribe(
     data=>
     {
        this.productOfferList=data;
     },
     error=>
     {
         return error;
     }

   )
 }
 gotoProductCategory()
 {

   this.productsevice.getProductOfferCategoryAndOfferVale(this.subCategoryId,this.offerValue)
   .subscribe(
     data=>
     {
        this.productOfferList=data;
     },
     error=>
     {
         return error;
     }

   )
 }
}
