import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { Product } from 'src/app/models/Classes/Product';
import { ICategory } from 'src/app/models/Interfaces/ICategory';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-subcategoryproduct',
  templateUrl: './subcategoryproduct.component.html',
  styleUrls: ['./subcategoryproduct.component.scss']
})
export class SubcategoryproductComponent implements OnInit {
  errorMsg='';
  subCategoryId:number;
 isfound:boolean=false;
  productList:IProduct[]=[];
  productList2:IProduct[]=[];
  subcategoryList:ISubCategory[]=[];
  brandList:Ibrand[]=[];
  public  product :IProduct={id:0,name:"",averageRating:0,brandID:0,color:"",description:"",mainImage:"",price:0,quantity:0,size:"",SubCategoryID:0,supplierID:0};
  hasSubCayegoryProduct:boolean=false;
  content:string='';
  products:boolean=false;
  supplierList:ISupplier[]=[];
  Allsize:string[]=[];
  UniqeSize:string[]=[];
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute,private subcategoryservice:SubcategoryService,private brandservice:BrandService,private supplierService:SupplierService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.subCategoryId=parseInt(params.get('id'));
    })
    this.getAllProductInaSpecificSaubCategory();
    this.getAllSubCategory();
    this.getAllBrand();
    this.GetAllSupplier();
    this.getAllSizes();
    console.log(this.Allsize);
    // this.getProductbuSubCategory(this.minprice,this.maxprice);
  }
getAllProductInaSpecificSaubCategory()
{
  this.productservice.getAllProductBySubCategoryId(this.subCategoryId).subscribe(
    data=>
    {

      this.productList=data;
      this.productList2=data;
      if(data.length!=0)
      {
          console.log(this.subCategoryId);
          data.forEach(element=>{
          this.Allsize.push(element.size);
      })
      this.UniqeSize = this.Allsize.filter((x, i, a) => a.indexOf(x) === i)
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
getAllSubCategory(){
  this.subcategoryservice.getAllSubCategories().subscribe(
    serviceData=>
    {
      if(serviceData.length>0)
      {
        this.subcategoryList=serviceData;
       
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}
getAllBrand(){
  this.brandservice.getAllBrands().subscribe(
    data=>
    {
      if(data.length>0)
      {
         this.brandList=data;
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}

getProductsInBrand( brandID:number){
  this.productservice.getAllProductInSpacificBrand(this.subCategoryId,brandID).subscribe(
    serviceData=>
    {
      this.productList=serviceData;
      if(serviceData.length==0)
      {
        this.hasSubCayegoryProduct=false;
          this.content=`There is No Product in This Brand` ;
      }
        else
        {
         
          this.hasSubCayegoryProduct=true;
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}
getProductInSize(productSize:number)
{
  this.productservice.getAllProductInSpacificSize(this.subCategoryId,productSize).subscribe(
    serviceData=>
    {
      if(serviceData.length>0)
      {
        this.productList=serviceData;
       console.log(productSize);
       console.log(this.subCategoryId);
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
  
}
GetAllSupplier(){
  this.supplierService.getAllSupplier().subscribe(
    serviceData=>
    {
      if(serviceData.length>0)
      {
        this.supplierList=serviceData;
        
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}
getAllSizes()
{
  this.productList2.forEach(element=>{
      this.Allsize.push(element.size);
  })
  console.log(this.productList2);
  console.log(this.Allsize);
  
}
}
