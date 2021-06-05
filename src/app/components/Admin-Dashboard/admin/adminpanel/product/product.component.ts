import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

 product=new IProduct(0,'','',0,0,'',0,0,0,0,0);
  //errorMsg="";
  productList:IProduct[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
   
    this.productService.refreshNeeded$.subscribe(()=>{
      this.GetAllProduct()
    })
    this.GetAllProduct();
    this.resetform();

  }

GetAllProduct(){
  this.productService.getAllProduct().subscribe(
    serviceData=>
    {
      this.productList=serviceData;
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}

  resetform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.product= {
       id:0,  
      name:'',
       description:'',
      quantity:0,
     price:0,
    color:'', 
    size:0,
    subCategoryID:0,
    brandID:0,
   supplierID:0,
    averageRating:0,
      
    }
  }
  errorMsg='';
  AddnewProduct(form : NgForm)
  {
     this.productService.addNewProduct(this.product).subscribe(
      data => {
        this.product=data;
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
        this.product=data;
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


  