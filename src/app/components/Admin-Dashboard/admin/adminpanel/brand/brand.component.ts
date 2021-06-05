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
        this.brandtList=serviceData;
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
        this.brand=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
  updateBrand(brandId:number)
  {
    let brands:Ibrand;
    this.brandService.updateBrand(brandId,brands).subscribe(
      data => {
        this.brandForm.setValue({
          name: data.name
        }); 
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
  }
}
