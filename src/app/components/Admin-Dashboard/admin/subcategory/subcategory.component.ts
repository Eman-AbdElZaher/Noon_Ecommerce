import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/models/Interfaces/ICategory';
import { IMainCategory } from 'src/app/models/Interfaces/IMainCategory';
import { ISubCategory } from 'src/app/models/Interfaces/ISubCategory';
import { CategoryService } from 'src/app/services/category.service';
import { MainCategoryService } from './../../../../services/main-category.service';
import { UploadImageService } from './../../../../services/upload-image.service';
import { SubcategoryService } from './../../../../services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  CategoryList:ICategory[]=[];
  Subcategories:ISubCategory[]=[];
  errorMsg:string;
  updatesubCategoryClicked:boolean=false;
  hasCategories:boolean=false;
  isLoading:boolean=true;
  SubcategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    categoryId: [, [Validators.required]]
  });
  message: string;
  imageFile!: File;
  imagePath:any;
  subCategoryId: any;
  categories:ICategory[]=[];
  updatedCategory:ISubCategory;
  SubcategoriesCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  found:boolean=false;
  constructor(
    private fb: FormBuilder,
    private _SubcategoryService:SubcategoryService,
    private http:HttpClient,
    private _categoryservice:CategoryService,
    private _uploadImageService:UploadImageService
    ) { }

  ngOnInit(): void {
    this.getCategoriesCount();
    this.getSelectedPage(1);
    this.getAllCategory();
  }
  get name ()
  {
    return this.SubcategoryForm.get('name');
  }
  get categoryId ()
  {
    return this.SubcategoryForm.get('categoryId');
  }
  get image (){
    return this.SubcategoryForm.get('image');
  }
  getAllCategory(){
    this._categoryservice.getAllCategories().subscribe(
      data =>{
       this.CategoryList=data;
       console.log(this.CategoryList);
      },
      error=>
      {
       this.errorMsg=error;
      }
    )
  }
  getCategoryName(id:number){
    let Name;
    this._categoryservice.getCategoryById(id).subscribe(
      data =>{
        Name=data.name;
        console.log(data.name);
      },
      err=> console.log(err)
    )
    return Name;
  }
  loadAllSubCategories(){
    this._SubcategoryService.getAllSubCategories().subscribe(
      data =>
      {
         this.Subcategories=data;
         if(data.length !=0)
         {
           this.hasCategories=true;
         }
         this.Subcategories.forEach(cat => {
          this.getMinCategory(cat.categoryID)
        });
      },
      err =>
      {
        this.errorMsg=err;
      }
    )
  }
  init(){
    this.getCategoriesCount();
    this.getSelectedPage(this.currentPageNumber);
  }
  submitButtonClicked() {
      this.uploadFile(this.imageFile);
      this.getCategoriesCount();
      this.getSelectedPage(this.currentPageNumber)
  }
 updateButtonClicked(){
   if (this.imageFile == undefined)
        this.updateSubCategory({ fileName:this.updatedCategory.image});
      else
        this.uploadFile(this.imageFile);
    }

  uploadFile(image: File) {
    console.log(image.name);
    const formDate = new FormData();
    formDate.append("file", image, image.name);
    this._uploadImageService.uploadImage(formDate).subscribe(
      data => {
        if(this.updatesubCategoryClicked===true)
        {
          this.updateSubCategory(data);
          this.updatesubCategoryClicked=false;
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
    var category : ISubCategory= {
      id: 0,
      name: this.name.value,
      image: data.fileName,
      categoryID:this.categoryId.value
    }
    this._SubcategoryService.addNewSubCategory(category).subscribe(
      data => {
        this.SubcategoryForm.reset();
        this.getCategoriesCount();
        this.getSelectedPage(this.currentPageNumber);
      },
      error => {
        console.log(error)
      }
    );
  }
  assignFormControlsToCategoryData(id:number) {
    this.updatesubCategoryClicked=true;
    this.subCategoryId=id;
    this._SubcategoryService.getSubCategoryById(id).subscribe(
      data =>{
        this.SubcategoryForm.get("name")?.setValue(data.name);
        this.SubcategoryForm.get("categoryId")?.setValue(data.categoryID);
      },
      error =>
      {
        console.log(`update error is ${error}`)
      }
    )
    
  }

  updateSubCategory(data:any){
    this.updatedCategory={
      id:this.subCategoryId,
      name:this.name.value,
      image:data.fileName,
      categoryID:this.categoryId.value
    }
    this._SubcategoryService.updateSubCategory(this.subCategoryId,this.updatedCategory).subscribe(
      (res)=>
      {
        this.getSelectedPage(1);
        this.SubcategoryForm.reset(); 
      },
    
      (errorResponse)=>
      {
       this.errorMsg=errorResponse;
       alert("falied")
      })
  }

  deleteCategory(categoryId: number) {  
    if (confirm("Are you sure you want to delete this category ?")) {   
    this._SubcategoryService.deleteSubCategory(categoryId).subscribe(() => {  
      this.message = 'Record Deleted Succefully';
      this.getCategoriesCount(); 
      this.getSelectedPage(this.currentPageNumber);
    });  
  }  
}  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
  private getCategoriesCount(){
    this._SubcategoryService.getSubCategoriesCount().subscribe(
      data => {
        this.SubcategoriesCount = data;
        this.numberOfPages = Math.ceil(this.SubcategoriesCount / this.pageSize);
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
    this._SubcategoryService.getSubCategoriesByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.Subcategories= data;
        this.isLoading=false;
        this.Subcategories.forEach(cat => {
           this.getMinCategory(cat.categoryID)
        });
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
  getMinCategory(MinID:number)
  {
    this.found=false
    this._categoryservice.getCategoryById(MinID).subscribe(
  
 
      data => {
       
       
        if(this.categories.length==0)
        {
          this.categories.push(data);
          console.log("frist time") 
        }
        else 
        {
          this.categories.forEach(min=>
            {
              if(data.name==min.name)
              {
                this.found=true
                console.log("asd")
              }
            
              
            })
 
            if(this.found==false)
            {
              this.categories.push(data);
                console.log("second time")
                
            }
          
        } 
  },
 
    )
  }
  
}
