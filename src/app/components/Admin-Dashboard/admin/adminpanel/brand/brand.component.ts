import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ibrand } from 'src/app/models/Classes/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
brand=new Ibrand(0,'');
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
  }
  reserform(form? : NgForm){
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
}
