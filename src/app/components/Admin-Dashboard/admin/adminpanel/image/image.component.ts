import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IImage } from 'src/app/models/Interfaces/IImage';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
declare var $:any;
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
  noimageinproduct:boolean=false;
  productList:IProduct[]=[];
  ImagesCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  productsNames:string[]=[];
  isLoading: boolean=true;
 
  constructor(
    private imageService:ImageService
    ,private productService:ProductService,
    private _uploadImageService:UploadImageService) { }
  imageFile!: File;
  ngOnInit(): void {
   
    // this.imageService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllImage()
    // })
    this.GetAllImage();
    this.getImageCount();
    this.getSelectedPage(1);
    this.reserform();
    this.GetAllProduct();

  }
  init(){
    this.reserform();
    this.getImageCount();
    this.getSelectedPage(1);
    $('.close').click();
  }

GetAllImage(){
  this.imageService.getAllImages().subscribe(
    serviceData=>
    {
      if(serviceData.length > 0)
      {
         this.imageList=serviceData;
        this.hasImages=true 
        serviceData.forEach(image => {
          this.productService.getProductById(image.productID).subscribe(
            data => {
               this.productsNames.push(data.name) 
               console.log(this.productsNames);
               console.log(data.name);
            }
          );
        });
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
        this.init();
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
        this.init();
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
    imagesByProductsId(productid){
    console.log(productid.value);
      this.imageService.getImageProduct(productid.value).subscribe(
        data => {   
         this.imageList=data;
         if(data.length==0)
         {
           this.noimageinproduct=true;
         }
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
        this.uploadFile();
      }
    }
    private getImageCount(){
      this.imageService.getImagesntCount().subscribe(
        data => {
          this.ImagesCount = data;
          this.numberOfPages = Math.ceil(this.ImagesCount / this.pageSize);
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
      this.imageService.getImagesByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.imageList= data;
          this.isLoading=false;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          if(data.length != 0)
            this.hasImages = true;
          else
            this.hasImages = false;
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
         this.imageobj.image=this.imageFile.name;
        },
        error => {
          console.log(error)
        }
      );
    }
}


  
