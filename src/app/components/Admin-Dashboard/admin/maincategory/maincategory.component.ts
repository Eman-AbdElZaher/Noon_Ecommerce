import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMainCategory } from 'src/app/models/Interfaces/IMainCategory';
import { MainCategoryService } from 'src/app/services/main-category.service';

@Component({
  selector: 'app-maincategory',
  templateUrl: './maincategory.component.html',
  styleUrls: ['./maincategory.component.scss']
})
export class MaincategoryComponent implements OnInit {
  hasMainCategories:boolean = false;
  MainCategoryList:IMainCategory[]=[]; 
  errorMsg:string;
  categoryId:number;
  maincategoryForm : FormGroup;
  loading = false;
  newmainCategory:IMainCategory;
  massage: string;
  get name ()
  {
    return this.maincategoryForm.get('name');
  }

  constructor(
    private _maincategoryservice:MainCategoryService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this._maincategoryservice.refreshNeeded$.subscribe(()=>{
      this.getAllMainCategory();
    })
    this.getAllMainCategory();
    this.maincategoryForm=this.fb.group({
      name :['',[Validators.required]]
    });
  }
  getAllMainCategory(){
    this._maincategoryservice.getAllCategories().subscribe(
      data =>{
       this.MainCategoryList=data;
       console.log(this.MainCategoryList);
       if(data.length != 0)
       this.hasMainCategories = true;
     else
       this.hasMainCategories = false;
      },
      error=>
      {
       this.errorMsg=error;
      }
    )
  }

  AddnewCategory(){
    this.newmainCategory={
      id:0,
      name:this.name.value
    }
    this._maincategoryservice.addNewMainCategory(this.newmainCategory).subscribe(
      data =>{
         console.log(data);
         this.hasMainCategories=true;
         this.MainCategoryList.push(data);
         this.maincategoryForm.reset(); 
      },
      error => {
        console.log(error);
      }
    )
     
  }

  loadMaincategorybyId(id:number){
    this.categoryId=id;
    this._maincategoryservice.getMainCategoryById(id).subscribe(
      res =>
      {
        this.maincategoryForm.controls['name'].setValue(res.name);
      },
      error =>
      {
        this.errorMsg=error;
      }
    )
  }
  updateMainCategory(){
    console.log(this.categoryId);
    this.newmainCategory={
      id:this.categoryId,
      name:this.name.value
    }
    this._maincategoryservice.updateMainCategory(this.categoryId,this.newmainCategory).subscribe(
      (res)=>
      {
        this.getAllMainCategory();
        this.maincategoryForm.reset(); 
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
       alert("falied")
      })
  }
  deleteMainCategory(categoryId: number) {  
    if (confirm("Are you sure you want to delete this category ?")) {   
    this._maincategoryservice.deleteMainCategory(categoryId).subscribe(() => {  
      this.massage = 'Record Deleted Succefully';  
      this.getAllMainCategory();
    });  
  }  
}  

}
