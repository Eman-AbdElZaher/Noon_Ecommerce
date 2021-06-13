import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { BrandService } from 'src/app/services/brand.service';
import { UploadImageService } from '../../../../../services/upload-image.service';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { ApiController } from 'src/app/controller/ApiController';
import { HttpClient } from '@angular/common/http';

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
  productId:any;
  @ViewChild('Imagetitle') title: ElementRef;
  message: string;
  imageFile!: File;
  imagePath:any;
  products:string[]=[];
  productsForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    quantity: [, [Validators.required]],
    price:[,[Validators.required]],
    color:[,[Validators.required]],
    size:[,[Validators.required]],
    SubCategoryID:[,[Validators.required]],
    brandID:[,[Validators.required]],
    mainImage:[,[Validators.required]],
    supplierID:[,[Validators.required]],
  });
  path:any=ApiController.ImagePath;
  constructor(
    private productService:ProductService,
    private brandService:BrandService,
    private supplierService:SupplierService,
    private subCategory:SubcategoryService,
    private fb: FormBuilder,
    private _uploadImageService:UploadImageService,
    private http:HttpClient
    )
     { }


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
  get image (){
    return this.productsForm.get('image');
  }
  submitButtonClicked() {
    this.uploadFile(this.imageFile);
}
uploadFile(image: File) {
  console.log(image.name);
  const formDate = new FormData();
  formDate.append("file", image, image.name);
  this._uploadImageService.uploadImage(formDate).subscribe(
    data => {
      console.log(data);
      this.AddnewProduct(image.name);
      //this.title.nativeElement.Value=data.fileName;
    },
    error => {
      console.log(error)
    }
  );
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
             this.products.push(data.name) 
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
  errorMsg='';
  AddnewProduct(data:any)
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
  assignFormControlsToCategoryData(id:number) {
    this.productId=id;
    this.productService.getProductById(id).subscribe(
      data =>{
        this.productsForm.get("name")?.setValue(data.name);
        this.productsForm.get("mainImage")?.setValue(data.mainImage);
        this.title.nativeElement.value=data.mainImage;
        this.productsForm.get("subCategoryID")?.setValue(data.subCategoryID);
        this.productsForm.get("brandID")?.setValue(data.brandID);
        this.productsForm.get("description")?.setValue(data.description);
        this.productsForm.get("supplierID")?.setValue(data.supplierID);
        this.productsForm.get("color")?.setValue(data.color);
        this.productsForm.get("price")?.setValue(data.price);
        this.productsForm.get("quantity")?.setValue(data.quantity);
        this.productsForm.get("size")?.setValue(data.size);
      },
      error =>
      {
        console.log(`update error is ${error}`)
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
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];
      }
    }
 
}


  