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
  constructor(private supplierService:SupplierService) { }

  ngOnInit(): void {
   
    this.supplierService.refreshNeeded$.subscribe(()=>{
      this.GetAllSupplier()
    })
    this.GetAllSupplier();
    this.reserform();

  }

GetAllSupplier(){
  this.supplierService.getAllSupplier().subscribe(
    serviceData=>
    {
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
  }
  DeleteSupplier(supplierId:number)
  {
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
      },
      error=>
      {
       this.errorMsg = error;
      }
     )
    }
}


  