import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ISupplier } from 'src/app/models/Interfaces/ISupplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  supplier=new ISupplier(0,'','','');
  //errorMsg="";
  supplierList:ISupplier[]=[];
  hasSuppliers:boolean=false;
  SuppliersCount:number;
  pageSize:number = 4;
  currentPageNumber:number = 1;
  numberOfPages:number; 
  isLoading:boolean=true;
  constructor(private supplierService:SupplierService) { }

  ngOnInit(): void {
   
    // this.supplierService.refreshNeeded$.subscribe(()=>{
    //   this.GetAllSupplier()
    // })
    this.GetAllSupplier();
    this.init();
  }

GetAllSupplier(){
  this.supplierService.getAllSupplier().subscribe(
    serviceData=>
    {
      this.isLoading=false;
      if(serviceData.length>0)
      {
        this.supplierList=serviceData;
        this.hasSuppliers=true;
      }
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}
init(){
  this.getProductsCount();
  this.getSelectedPage(this.currentPageNumber);
  this.reserform();
}

  reserform(form? : NgForm){
    if(form !=null)
      form.reset();
    this.supplier= {
      id:0,
      name:'',
      email:'',
      address:''
    }
  }
  errorMsg='';
  AddnewSupplier(form : NgForm)
  {
     this.supplierService.addNewSupplier(this.supplier).subscribe(
      data => {
        this.supplier=data;
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
     this.init();
  }
  DeleteSupplier(supplierId:number)
  {
    if (confirm("Are you sure you want to delete this Advertisement ?")) {
    this.supplierService.deleteSupplier(supplierId).subscribe(
      data => {
        this.supplierService.getAllSupplier().subscribe(
          supplires=>
          {
            this.supplierList=supplires;
            console.log(supplires.length);
            console.log(supplires[0]);
          }
        )
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
    this.init();
  }
}
  EditSupplier(supplierId:number,supplier:ISupplier)
  {
    this.supplierService.updateSupplier(supplierId,supplier).subscribe(
      data => {
        this.supplier=data;
        this.supplierService.getAllSupplier().subscribe(
          supplires=>
          {
            this.supplierList=supplires;
            console.log(supplires.length);
            console.log(supplires[0]);
          }
        )
      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  SaveEditSupplier(form : NgForm)
  {
     this.supplierService.updateSupplier(this.supplier.id,this.supplier).subscribe(
      data => {
        this.supplier=data;
        this.getProductsCount();
        this.getSelectedPage(this.currentPageNumber);
        this.reserform();
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
    private getProductsCount(){
      this.supplierService.getSuppliersCount().subscribe(
        data => {
          this.SuppliersCount= data;
          this.numberOfPages = Math.ceil(this.SuppliersCount / this.pageSize);
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
      this.supplierService.getSupplierByPage(this.pageSize,currentPageNumber).subscribe(
        data => {
          this.supplierList= data;
          this.isLoading=false;
          this.currentPageNumber = currentPageNumber;
          console.log(this.currentPageNumber)
          if(data.length != 0)
            this.hasSuppliers= true;
          else
            this.hasSuppliers = false;
        },
        error=>
        {
         this.errorMsg = error;
        }
      ) 
    }
}


  