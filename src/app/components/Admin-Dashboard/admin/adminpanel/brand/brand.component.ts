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
  brandsCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  isLoading:boolean=true;
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    // this.brandService.refreshNeeded$.subscribe(()=>{
    //   this.returnAllBrands();
    // })
    // this.returnAllBrands();
    this.getBrandCount();
    this.getSelectedPage(1);
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
          this.getBrandCount();
          this.getSelectedPage(this.numberOfPages);
          
        
       
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
        this.getSelectedPage(this.currentPageNumber);
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
    private getBrandCount(){
      this.brandService.getBrandsCount().subscribe(
        data => {
          this.brandsCount = data;
          this.numberOfPages = Math.ceil(this.brandsCount / this.pageSize);
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
      this.brandService.getBrandByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.brandtList= data;
          this.isLoading=false;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          if(data.length != 0)
            this.hasBrand = true;
          else
            this.hasBrand = false;
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
}
