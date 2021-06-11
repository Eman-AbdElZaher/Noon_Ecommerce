import { Component, OnInit } from '@angular/core';
import { IMainCategory } from 'src/app/models/Interfaces/IMainCategory';
import { MainCategoryService } from 'src/app/services/main-category.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  MainCategoryList:IMainCategory[]=[];
  errorMsg: any;
  
  constructor(
    private _maincategoryservice:MainCategoryService
  ) { }

  ngOnInit(): void {
  }
  getAllMainCategory(){
    this._maincategoryservice.getAllCategories().subscribe(
      data =>{
       this.MainCategoryList=data;
       console.log(this.MainCategoryList);
      },
      error=>
      {
       this.errorMsg=error;
      }
    )
  }

}
