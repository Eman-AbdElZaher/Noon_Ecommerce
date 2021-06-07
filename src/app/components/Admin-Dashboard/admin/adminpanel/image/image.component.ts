import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IImage } from 'src/app/models/Interfaces/IImage';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  imageobj=new IImage(0,'',0);
  //errorMsg="";
  imageList:IImage[]=[];
  constructor(private imageService:ImageService) { }

  ngOnInit(): void {
   
    this.imageService.refreshNeeded$.subscribe(()=>{
      this.GetAllImage()
    })
    this.GetAllImage();
    this.reserform();

  }

GetAllImage(){
  this.imageService.getAllImages().subscribe(
    serviceData=>
    {
      this.imageList=serviceData;
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
      data => {
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
}


  
