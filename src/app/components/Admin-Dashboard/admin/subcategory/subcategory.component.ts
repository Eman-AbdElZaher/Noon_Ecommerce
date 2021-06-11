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
  categories:string[]=[];
  errorMsg:string;
  updatesubCategoryClicked:boolean=false;
  hasCategories:boolean=false;
  SubcategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    categoryId: [, [Validators.required]]
  });
  @ViewChild('Imagetitle') title: ElementRef;
  message: string;
  imageFile!: File;
  imagePath:any;
  subCategoryId: any;
  updatedCategory:ISubCategory;
  constructor(
    private fb: FormBuilder,
    private _SubcategoryService:SubcategoryService,
    private http:HttpClient,
    private _categoryservice:CategoryService,
    private _uploadImageService:UploadImageService
    ) { }

  ngOnInit(): void {
    this.loadAllSubCategories();
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
          this._categoryservice.getCategoryById(cat.categoryID).subscribe(
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
   this.updatesubCategoryClicked=true;
   if (this.imageFile === undefined)
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
        console.log(data);
      this.AddnewCategory(image.name);
        if(this.updatesubCategoryClicked==true)
        {
          this.updateSubCategory(image.name);
        }
        else{
           this.AddnewCategory(image.name);  
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
      image: data,
      categoryID:this.categoryId.value
    }
    this._SubcategoryService.addNewSubCategory(category).subscribe(
      data => {
        this.loadAllSubCategories();
      },
      error => {
        console.log(error)
      }
    );
  }
  assignFormControlsToCategoryData(id:number) {
    this.subCategoryId=id;
    this._SubcategoryService.getSubCategoryById(id).subscribe(
      data =>{
        this.SubcategoryForm.get("name")?.setValue(data.name);
        this.SubcategoryForm.get("image")?.setValue(data.image);
        this.title.nativeElement.value=data.image;
        this.SubcategoryForm.get("categoryId")?.setValue(data.categoryID);
      },
      error =>
      {
        console.log(`update error is ${error}`)
      }
    )
    
  }

  updateSubCategory(imgfile){
    console.log(this.categoryId);
    this.updatedCategory={
      id:this.subCategoryId,
      name:this.name.value,
      image:imgfile.fileName,
      categoryID:this.categoryId.value
    }
    this._SubcategoryService.updateSubCategory(this.subCategoryId,this.updatedCategory).subscribe(
      (res)=>
      {
        this.loadAllSubCategories();
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
      this.loadAllSubCategories();
    });  
  }  
}  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

}
