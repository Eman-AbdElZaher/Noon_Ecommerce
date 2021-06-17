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
    CVV:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    ExpireMonth:['',Validators.required],
    ExpireYear:['',Validators.required],

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
  get  ExpireMonth ()
  {
    return this.PayForm.get('ExpireMonth');
  }
  get ExpireYear()
  {
    return this.PayForm.get('ExpireYear');
  }
  CheckOut()
  {
    // if(confirm('Are you sure'))
    // {
    this.orderService.CheckoutOrder().subscribe(
     data=>{console.log(data);

     }
    )
    // }
  }

}
