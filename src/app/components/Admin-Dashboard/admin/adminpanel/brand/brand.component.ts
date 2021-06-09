import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
brand=new Ibrand(0,'');
brandtList:Ibrand[]=[];
hasBrand:boolean=false;
brandForm: FormGroup;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.brandService.refreshNeeded$.subscribe(()=>{
      this.returnAllBrands();
    })
    this.returnAllBrands();
    this.resetform();
  }
  returnAllBrands()
  {
     this.brandService.getAllBrands().subscribe(
      serviceData=>
      {
        if(serviceData.length>0)
        {
           this.brandtList=serviceData;
           this.hasBrand=true;
        }
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  resetform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.brand= {
      name : '',
      id:0
    }
  }
  errorMsg='';
  AddnewBrandt(form : NgForm)
  {
     this.brandService.addNewBrand(this.brand).subscribe(
      data => {
        this.brand=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  deleteBrand(brandId)
  {
     this.brandService.deleteBrand(brandId).subscribe(
      data => {
        this.brandService.getAllBrands().subscribe(
          brands=>
          {
            this.brandtList=brands;
            console.log(brands.length);
            console.log(brands[0]);
          }
        )
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  updateBrand(brandId:number, brands:Ibrand)
  {
    this.brandService.updateBrand(brandId,brands).subscribe(
      data => {
        
        this.brand=data;
        this.brandForm.setValue({
          name: data.name
        });
        this.brandService.getAllBrands().subscribe(
          brands=>
          {
            this.brandtList=brands;
            console.log(brands.length);
            console.log(brands[0]);
          }
        ) 
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  SaveEditBrand(form : NgForm)
  {
     this.brandService.updateBrand(this.brand.id,this.brand).subscribe(
      data => {
        this.brand=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
}
