import { Component, OnInit } from '@angular/core';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-showsubcategory',
  templateUrl: './showsubcategory.component.html',
  styleUrls: ['./showsubcategory.component.scss']
})
export class ShowsubcategoryComponent implements OnInit {
 
  errorMsg="";
  SubcategoriesList:ISubCategory[]=[];
  constructor( private _SubcategoryService:SubcategoryService,) { }

  ngOnInit(): void {
    // this._SubcategoryService.refreshNeeded$.subscribe(()=>{
    //   this.getAllSubCategory();
    // })
     this.getAllSubCategory();
  }

  getAllSubCategory(){
    this._SubcategoryService.getAllSubCategories().subscribe(
      serviceData=>
      {
        this.SubcategoriesList=serviceData;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })

  }

}
