import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-newarrival',
  templateUrl: './newarrival.component.html',
  styleUrls: ['./newarrival.component.scss']
})
export class NewarrivalComponent implements OnInit {
newArrivals:IProduct[]=[];
  constructor(private newarrival:ProductService) { }

  ngOnInit(): void {
    this.getAllNewArrival();
  }
getAllNewArrival()
{
   this.newarrival.getNewArrivalProduct(8).subscribe(
     data=>
     {
       this.newArrivals=data;
     },
    errors=>
    {
       return errors;
    }
   )
}
}
