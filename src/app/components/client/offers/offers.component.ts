import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  productList:IProduct[]=[];
  errorMsg="";
  constructor(private productService:ProductService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    stagePadding:310,
    margin:0,
    autoplayTimeout: 3000,
		autoplayHoverPause: true,
    dots: false,
    autoplay:true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        stagePadding: 50,
        items: 1 
      },
      400: {
        stagePadding: 50,
        items: 2
      },
      760: {
        stagePadding: 50,
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this.productService.refreshNeeded$.subscribe(()=>{
      this.getAllProductDevices()
    })
    this.getAllProductDevices();
  }
getAllProductDevices()
{
  this.productService.getAllProductsDevices().subscribe(
    serviceData=>
    {
      this.productList=serviceData;
    },
    errorResponse=>
    {
     this.errorMsg=errorResponse;
    })
}
}
