import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private ffb:FormBuilder,private orderService:OrderService) { }
  PayForm=this.ffb.group(
    {
    UserName: ['', [Validators.required]],
    CardNumber:['',[Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
    CVV:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]],
    ExpireDate:['',Validators.required]
    }
    );

  ngOnInit(): void {
  }
  get UserName ()
  {
    return this.PayForm.get('UserName');
  }
  get CardNumber ()
  {
    return this.PayForm.get('CardNumber');
  }
  get CVV ()
  {
    return this.PayForm.get('CVV');
  }
  get ExpireDate ()
  {
    return this.PayForm.get('ExpireDate');
  }
  CheckOut()
  {
    if(confirm('Are you sure'))
    {
    this.orderService.CheckoutOrder().subscribe(
     data=>{console.log(data);

     }
    )
    }
  }

}
