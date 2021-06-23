import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  errorMsg='';
  productList:IProduct[]=[];
  productList2:IProduct[]=[];
  subcategoryList:ISubCategory[]=[];
  brandList:Ibrand[]=[];
  public  product :IProduct={id:0,name:"",averageRating:0,brandID:0,color:"",description:"",mainImage:"",price:0,quantity:0,size:"",SubCategoryID:0,supplierID:0};
  hasSubCayegoryProduct:boolean=false;
  content:string='';
  products:boolean=false;
  supplierList:ISupplier[]=[];
  count:number;
  Allsize:string[]=[];
  UniqeSize:string[]=[];
  Allcolor:string[]=[];
  UniqeColor:string[]=[];
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute,private subcategoryservice:SubcategoryService,private brandservice:BrandService,private supplierService:SupplierService) { }

  ngOnInit(): void {
   
    this.getAllSubCategory();
    this.getAllBrand();
    this.getAllProducts();
    this.GetAllSupplier();
    
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
  
  getAllProducts(){
    this.productservice.getAllProduct().subscribe(
      data=>
      {
        if(data.length>0)
        {
          
        this.productList=data;
        this.productList2=data;
        console.log(this.productList);
        console.log(this.productList2);
        data.forEach(element=>{
          this.Allsize.push(element.size);
          this.Allcolor.push(element.color);
      })
      this.UniqeSize = this.Allsize.filter((x, i, a) => a.indexOf(x) === i);
      this.UniqeColor=this.Allcolor.filter((x, i, a) => a.indexOf(x) === i);
        this.hasSubCayegoryProduct=true;


        }

        
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }

  getAllProductInaSpecificSaubCategory(subCategoryId:number)
   {
  this.productservice.getAllProductBySubCategoryId(subCategoryId).subscribe(
    data=>
    {

      this.productList=data;
      if(data.length>0)
      {
        console.log(subCategoryId);
        console.log(this.productList);
      }
      else
      {
       
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

getAllProductsInBrand(brandId:number)
{
this.productservice.getAllProductInBrand(brandId).subscribe(
 data=>
 {

   this.productList=data;
   if(data.length>0)
   {
     console.log(brandId);
     console.log(this.productList);
   }
   else
   {
    
     this.content='There is No Product in This brand';
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

getAllProductsInsize(sizenumber:number)
{
this.productservice.getAllProductInSize(sizenumber).subscribe(
 data=>
 {

   this.productList=data;
   if(data.length>0)
   {
    
     console.log(sizenumber);
     console.log(this.productList);
   }
   else
   {
    
     this.content='There is No Product in This size';
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


getAllProductsInColor(productColor:string)
{
this.productservice.getAllProductInColor(productColor).subscribe(
 data=>
 {

   this.productList=data;
   if(data.length>0)
   {
     console.log(productColor);
     console.log(this.productList);
   }
   else
   {
    
     this.content='There is No Product in This Color';
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

getAllProductsInTwoPrice(minprice:any,maxprice:any)
{
this.productservice.getAllProductInTwoPrice(minprice,maxprice).subscribe(
 data=>
 {

   this.productList=data;
   if(data.length>0)
   {
     console.log(minprice);
     console.log(maxprice);
     console.log(this.productList);
   }
   else
   {
    
     this.content='There is No Product in This Color';
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

getAllProductsInSupplier(supplierId:number)
{
this.productservice.getAllProductInSupplier(supplierId).subscribe(
 data=>
 {

   this.productList=data;
   if(data.length>0)
   {
     console.log(supplierId);
   
     console.log(this.productList);
   }
   else
   {
    
     this.content='There is No Product in This Supplier';
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
getProductCountInSubCategory(subcategoryId:number){
  this.productservice.getAllProductCountInSubCategory(subcategoryId).subscribe(
    data=>
    {
   
      this.count=data.length;
      console.log(this.count);
      if(data.length>0)
      {
       
        console.log(subcategoryId);
        
        console.log(data.length);
        
      }
      else
      {
       
        this.content='There is No Product in This Supplier';
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
