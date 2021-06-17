import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/Classes/Product';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-subcategoryproduct',
  templateUrl: './subcategoryproduct.component.html',
  styleUrls: ['./subcategoryproduct.component.scss']
})
export class SubcategoryproductComponent implements OnInit {
  subCategoryId:number;
  productList:IProduct[]=[]
  public  product :IProduct={id:0,name:"",averageRating:0,brandID:0,color:"",description:"",mainImage:"",price:0,quantity:0,size:"",SubCategoryID:0,supplierID:0};
  hasSubCayegoryProduct:boolean=false;
  content:string='';
  products:boolean=false;
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.subCategoryId=parseInt(params.get('id'));
    }) 
    this.getAllProductInaSpecificSaubCategory();
    // this.getProductbuSubCategory(this.minprice,this.maxprice);
  }
getAllProductInaSpecificSaubCategory()
{
  this.productservice.getAllProductBySubCategoryId(this.subCategoryId).subscribe(
    data=>
    {

      this.productList=data;
      if(data.length!=0)
      {
        this.hasSubCayegoryProduct=true;
      }
      else
      {
        this.hasSubCayegoryProduct=false;
        this.content='There is No Product in This SubCategory';
      }
      console.log(data);
      console.log(this.productList);
    },
    error=>
    {
      return error;
    }
  )
}
getProductbuSubCategory(minprice,maxprice)
{
  this.productservice.getAllProductinSubCategoryBetweenTwoprice(this.subCategoryId,minprice,maxprice).subscribe(
    data=>
    {
      this.productList=data;
      if(data.length==0)
      {
        this.hasSubCayegoryProduct=false;
        this.content=`There is No Product Between ${minprice} And ${maxprice}` ;
        console.log(this.hasSubCayegoryProduct);
        console.log(this.content);
      }
      else
      {
        this.hasSubCayegoryProduct=true;
      }
      console.log(data);
      console.log(this.productList);
    },
    error=>
    {
      return error;
    }
  )
}
}
