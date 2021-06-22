import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { BrandService } from 'src/app/services/brand.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
declare var $: any;
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
  ProductCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  imageFile!: File;
  constructor(
    private productService:ProductService,
    private brandService:BrandService,
    private supplierService:SupplierService,
    private subCategory:SubcategoryService,
    private _uploadImageService:UploadImageService) { }


  ngOnInit(): void {
   
    // this.productService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllProduct()
    // })
    // this.GetAllProduct();
    this.getProductsCount();
    this.getSelectedPage(1);
   this.reserform();
   this.getAllBrands();
   this.getAllSupplier();
   this.getAllSubCategory();
  }
  
loadAllCategories(){
  this.productService.getAllProduct().subscribe(
    data =>
    {
       this.productList=data;
       if(data.length !=0)
       {
         this.hasProducts=true;
       }
       this.productList.forEach(pro => {
        this.productService.getProductById(pro.id).subscribe(
          data => {
             //this.products.push(data.name) 
          }
        );
      });
    },
    err =>
    {
      this.errorMsg=err;
    }
  )
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
     averageRating:0,
     mainImage:''
    }
  }
  init(){
    this.getProductsCount();
    this.getSelectedPage(1);
    $('#close').click();
  }
  errorMsg='';
  AddnewProduct(data:any)
  {
     console.log(this.product);
     this.productService.addNewProduct(this.product).subscribe(
      data => {
        this.product=data;
        console.log(this.product);
        this.init();
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
            this.init();
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
        this.init();
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
    private getProductsCount(){
      this.productService.getProductsCount().subscribe(
        data => {
          this.ProductCount = data;
          this.numberOfPages = Math.ceil(this.ProductCount / this.pageSize);
          console.log(this.numberOfPages);
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
    // pagination
    counter(i: number) {
      return new Array(i);
    }
    getSelectedPage(currentPageNumber:number){
      this.productService.getProductByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.productList= data;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          if(data.length != 0)
            this.hasProducts= true;
          else
            this.hasProducts = false;
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
    uploadFile() {
      const formDate = new FormData();
      formDate.append("file", this.imageFile, this.imageFile.name);
      this._uploadImageService.uploadImage(formDate).subscribe(
        data => {
         this.product.mainImage=this.imageFile.name;
         console.log(this.imageFile);
        },
        error => {
          console.log(error)
        }
      );
    }
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
        this.uploadFile();
      }
    }
 
}
