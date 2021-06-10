import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { BrandService } from 'src/app/services/brand.service';

import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 productForm : FormGroup;
 product=new IProduct();//(0,'','',0,0,'',0,0,0,0,0);
  //errorMsg="";
  productList:IProduct[]=[];


  brandList:Ibrand[]=[];
  supplier:ISupplier[]=[];
  subcategory:ISubCategory[]=[];
  hasProducts:boolean=false;
  constructor(private productService:ProductService,private brandService:BrandService,private supplierService:SupplierService,private subCategory:SubcategoryService) { }


  ngOnInit(): void {
   
    this.productService.refreshNeeded$.subscribe(()=>{
      this.GetAllProduct()
    })
    this.GetAllProduct();

    this.reserform();
   this.getAllBrands();
   this.getAllSupplier();
   this.getAllSubCategory();
  }
  getAllSubCategory()
  {
    this.subCategory.getAllSubCategories().subscribe(
      serviceData=>
      {
        this.subcategory=serviceData;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  getAllBrands()
  {
    this.brandService.getAllBrands().subscribe(
      serviceData=>
      {
        this.brandList=serviceData;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  getAllSupplier()
  {
    this.supplierService.getAllSupplier().subscribe(
      serviceData=>
      {
        this.supplier=serviceData;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
    }


GetAllProduct(){
  this.productService.getAllProduct().subscribe(
    serviceData=>
    {
      if(serviceData.length>0)
      {
        this.productList=serviceData;
        this.hasProducts=true;
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}

  reserform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.product= {
      id:0,  
      name:'',
      description:'',
      quantity:0,
      price:0,
     color:'', 
     size:'',
     SubCategoryID:0,
    brandID:0,
   supplierID:0,
   averageRating:0

      

    }
  }
  errorMsg='';
  AddnewProduct(form : NgForm)
  {
     console.log(this.product);
     this.productService.addNewProduct(this.product).subscribe(
      data => {
        this.product=data;
        console.log(data);
        console.log(this.product);
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  DeleteProduct(productId:number)
  {
    this.productService.deleteProduct(productId).subscribe(
      data => {
        this.productService.getAllProduct().subscribe(
          products=>
          {
            this.productList=products;
            console.log(products.length);
            console.log(products[0]);
          }
        )
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  EditProduct(productId:number,product:IProduct)
  {
    this.productService.updateProduct(productId,product).subscribe(
      data => {
        this.product=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  SaveEditProduct(form : NgForm)
  {
     this.productService.updateProduct(this.product.id,this.product).subscribe(
      data => {
        this.product=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
  
 
}


  