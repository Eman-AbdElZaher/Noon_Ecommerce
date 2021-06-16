import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiController } from 'src/app/controller/ApiController';
import { ICategory } from 'src/app/models/Interfaces/ICategory';
import { IMainCategory } from 'src/app/models/Interfaces/IMainCategory';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { MainCategoryService } from './../../../../services/main-category.service';
import { UploadImageService } from './../../../../services/upload-image.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  CategoryList:ICategory[]=[];
  Maincategories:IMainCategory[]=[];
  categories:string[]=[];
  errorMsg:string;
  hasCategories:boolean=false;
  categoryForm: FormGroup;
  message: string;
  updateCategoryClicked:boolean=false;
  imageFile!: File;
  imagePath:any;
  path:any=ApiController.ImagePath;
  categoryId: any;
  updatedCategory:ICategory;
  categoriesCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  get formFields() { return this.categoryForm.controls;}
  constructor(
    private fb: FormBuilder,
    private _categoryService:CategoryService,
    private http:HttpClient,
    private _maincategoryservice:MainCategoryService,
    private _uploadImageService:UploadImageService
    ) { }

  ngOnInit(): void {
    this.categoryForm= this.fb.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      maincategoryId: [, [Validators.required]]
    });
    this.getCategoriesCount();
    this.getSelectedPage(1);
    this.getAllMainCategory();
  }
  getAllMainCategory(){
    this._maincategoryservice.getAllCategories().subscribe(
      data =>{
       this.Maincategories=data;
       console.log(this.Maincategories);
      },
      error=>
      {
       this.errorMsg=error;
      }
    )
  }
  loadAllCategories(){
    this._categoryService.getAllCategories().subscribe(
      data =>
      {
         this.CategoryList=data;
         if(data.length !=0)
         {
           this.hasCategories=true;
         }
         this.CategoryList.forEach(cat => {
          this._maincategoryservice.getMainCategoryById(cat.mainCategoryID).subscribe(
            data => {
               this.categories.push(data.name) 
            }
          );
        });
      },
      err =>
      {
        this.errorMsg=err;
      }
    )
  }
  submitButtonClicked() {
      this.uploadFile(this.imageFile);
  }
  updateButtonClicked(){
    if (this.imageFile == undefined)
         this.updateCategory({ fileName:this.updatedCategory.image});
       else
         this.uploadFile(this.imageFile);
     }
  uploadFile(image: File) {
    console.log(image.name);
    const formDate = new FormData();
    formDate.append("file", image, image.name);
    this._uploadImageService.uploadImage(formDate).subscribe(
      data => {
        if(this.updateCategoryClicked===true)
        {
          this.updateCategory(data);
          this.updateCategoryClicked=false;
        }
        else{
           this.AddnewCategory(data);  
        }
      },
      error => {
        console.log(error)
      }
    );
  }
  
  AddnewCategory(data:any){
    var category : ICategory= {
      id: 0,
      name: this.formFields.name.value,
      image: data.fileName,
      mainCategoryID:this.formFields.maincategoryId.value
    }
    this._categoryService.addNewCategory(category).subscribe(
      data => {
        this.getSelectedPage(1);
      },
      error => {
        console.log(error)
      }
    );
  }
  assignFormControlsToCategoryData(id:number) {
    this.updateCategoryClicked=true;
    this.categoryId=id;
    this._categoryService.getCategoryById(id).subscribe(
      data =>{
        this.categoryForm.get("name")?.setValue(data.name);
        this.categoryForm.get("maincategoryId")?.setValue(data.mainCategoryID);
      },
      error =>
      {
        console.log(`update error is ${error}`)
      }
    )
    
  }

  updateCategory(data:any){
    console.log(this.categoryId);
    this.updatedCategory={
      id:this.categoryId,
      name:this.formFields.name.value,
      image:data.fileName,
      mainCategoryID:this.formFields.maincategoryId.value
    }
    this._categoryService.updateCategory(this.categoryId,this.updatedCategory).subscribe(
      (res)=>
      {
        this.getSelectedPage(1);
        this.categoryForm.reset(); 
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
       alert("falied")
      })
  }

  deleteCategory(categoryId: number) {  
    if (confirm("Are you sure you want to delete this category ?")) {   
    this._categoryService.deleteCategory(categoryId).subscribe(() => {  
      this.message = 'Record Deleted Succefully';  
      this.getSelectedPage(1);
    });  
  }  
}  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
  private getCategoriesCount(){
    this._categoryService.getCategoriesCount().subscribe(
      data => {
        this.categoriesCount = data;
        console.log(this.categoriesCount)
        this.numberOfPages = Math.ceil(this.categoriesCount / this.pageSize);
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
    this._categoryService.getCategoriesByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.CategoryList= data;
        this.CategoryList.forEach(cat => {
          this._maincategoryservice.getMainCategoryById(cat.mainCategoryID).subscribe(
            data => {
               this.categories.push(data.name) 
            }
          )});
        this.currentPageNumber = currentPageNumber;
        console.log(this.currentPageNumber)
        if(data.length != 0)
          this.hasCategories = true;
        else
          this.hasCategories = false;
  
      },
      error=>
      {
       this.errorMsg = error;
      }
    ) 
  }
}
