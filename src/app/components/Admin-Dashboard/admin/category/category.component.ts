import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  categoryForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    maincategoryId: [, [Validators.required]]
  });
  @ViewChild('Imagetitle') title: ElementRef;
  message: string;
  imageFile!: File;
  imagePath:any;
  path:any=ApiController.ImagePath;
  categoryId: any;
  updatedCategory:ICategory;
  constructor(
    private fb: FormBuilder,
    private _categoryService:CategoryService,
    private http:HttpClient,
    private _maincategoryservice:MainCategoryService,
    private _uploadImageService:UploadImageService
    ) { }

  ngOnInit(): void {
    this.loadAllCategories();
    this.getAllMainCategory();
  }
  get name ()
  {
    return this.categoryForm.get('name');
  }
  get maincategoryId ()
  {
    return this.categoryForm.get('maincategoryId');
  }
  get image (){
    return this.categoryForm.get('image');
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

  uploadFile(image: File) {
    console.log(image.name);
    const formDate = new FormData();
    formDate.append("file", image, image.name);
    this._uploadImageService.uploadImage(formDate).subscribe(
      data => {
        console.log(data);
        this.AddnewCategory(image.name);
        //this.title.nativeElement.Value=data.fileName;
      },
      error => {
        console.log(error)
      }
    );
  }
  
  AddnewCategory(data:any){
    //console.log(this.imagePath.fileName);
    var category : ICategory= {
      id: 0,
      name: this.name.value,
      image: data,
      mainCategoryID:this.maincategoryId.value
    }
    this._categoryService.addNewCategory(category).subscribe(
      data => {
        this.loadAllCategories();
      },
      error => {
        console.log(error)
      }
    );
  }
  assignFormControlsToCategoryData(id:number) {
    this.categoryId=id;
    this._categoryService.getCategoryById(id).subscribe(
      data =>{
        this.categoryForm.get("name")?.setValue(data.name);
        this.categoryForm.get("image")?.setValue(data.image);
        this.title.nativeElement.value=data.image;
        this.categoryForm.get("maincategoryId")?.setValue(data.mainCategoryID);
      },
      error =>
      {
        console.log(`update error is ${error}`)
      }
    )
    
  }

  updateCategory(){
    console.log(this.categoryId);
    this.updatedCategory={
      id:this.categoryId,
      name:this.name.value,
      image:'',
      mainCategoryID:this.maincategoryId.value
    }
    this._categoryService.updateCategory(this.categoryId,this.updatedCategory).subscribe(
      (res)=>
      {
        this.loadAllCategories();
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
      this.loadAllCategories();
    });  
  }  
}  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }
}
