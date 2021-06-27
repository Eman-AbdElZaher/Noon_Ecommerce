import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-poducts',
  templateUrl: './search-poducts.component.html',
  styleUrls: ['./search-poducts.component.scss']
})
export class SearchPoductsComponent implements OnInit {

  searchKey:string;
  productList:IProduct[]=[];
  errorMsg:string='';
  constructor(private productservice:ProductService,private activatedRoute:ActivatedRoute) { }
 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.searchKey=params.get('searchKeyProduct');
    })
    this.Search();
  }
  Search(){
    this.productservice.getProductBySearch(this.searchKey).subscribe(
      serviceData=>
      {
       this.productList=serviceData;
      
       console.log(this.productList);
      
 
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }

}
