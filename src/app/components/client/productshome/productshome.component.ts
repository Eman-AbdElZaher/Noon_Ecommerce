import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { OwlModule } from 'ngx-owl-carousel';
@Component({
  selector: 'app-productshome',
  templateUrl: './productshome.component.html',
  styleUrls: ['./productshome.component.scss']
})
export class ProductshomeComponent implements OnInit {
  productList:IProduct[]=[];
  errorMsg="";
  constructor(private serviceProduct:ProductService) { }
  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: false,
  //   stagePadding:150,
  //   margin:30,
  //   autoplayTimeout: 3000,
	// 	autoplayHoverPause: true,
  //   dots: false,
  //   autoplay:true,
  //   navSpeed: 600,
  //   navText: ['&#8249', '&#8250;'],
  //   responsive: {
  //     0: {
  //       stagePadding: 100,
  //       items: 1 
  //     },
  //     400: {
  //       stagePadding: 100,
  //       items: 2
  //     },
  //     760: {
  //       stagePadding: 130,
  //       items: 3
  //     },
  //     1000: {
  //       items: 4
  //     }
  //   },
  //   nav: false
  // }

  ngOnInit(): void {
    this.serviceProduct.refreshNeeded$.subscribe(()=>{
      this.getallProduct()
    })
    this.getallProduct();
  }
getallProduct()
{
  this.serviceProduct.getAllProduct().subscribe(
      products=>
      {
         this.productList=products;
         console.log(products);
         console.log(this.productList);
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })  
}

}
