import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IImage } from 'src/app/models/Interfaces/IImage';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  imageobj=new IImage(0,'',0);
  //errorMsg="";
  imageList:IImage[]=[];
  hasImages:boolean=false;
  productList:IProduct[]=[];
 
  constructor(private imageService:ImageService,private productService:ProductService) { }
  imageFile!: File;
  ngOnInit(): void {
   
    this.imageService.refreshNeeded$.subscribe(()=>{
      this.GetAllImage()
    })
    this.GetAllImage();
    this.reserform();
    this.GetAllProduct();

  }

GetAllImage(){
  this.imageService.getAllImages().subscribe(
    serviceData=>
    {
      if(serviceData.length > 0)
      {
         this.imageList=serviceData;
        this.hasImages=true 
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
    this.imageobj= {
      id:0,
      image:'',
      productID:0
      
    }
  }
  errorMsg='';
  AddnewImage(form : NgForm)
  {
     this.imageService.addNewImage(this.imageobj).subscribe(
      data => 
      {
        this.imageobj=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  DeleteImage(imageId:number)
  {
    this.imageService.deleteImage(imageId).subscribe(
      data => {
        this.imageService.getAllImages().subscribe(
          images=>
          {
            this.imageList=images;
            console.log(images.length);
            console.log(images[0]);
          }
        )
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  EditImage(imageId:number,image:IImage)
  {
    this.imageService.updateImage(imageId,image).subscribe(
      data => {
        this.imageobj=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  SaveEditImage(form : NgForm)
  {
     this.imageService.updateImage(this.imageobj.id,this.imageobj).subscribe(
      data => {
        this.imageobj=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
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
    ShowValue(productid){
    console.log(productid.value);
      this.imageService.getImageProduct(productid.value).subscribe(
        data => {   
         this.imageList=data;
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


  
