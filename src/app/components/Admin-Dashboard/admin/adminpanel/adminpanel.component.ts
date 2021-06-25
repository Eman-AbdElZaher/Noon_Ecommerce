import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
adminName:string;
private _hubConnection: HubConnection;
showimage: boolean=false;
signaldata: any[]=[];
countorder:number= localStorage.getItem('ordercount')?parseInt(localStorage.getItem('ordercount')):0;
  constructor(private authenticate:AuthenticationService) { }

  ngOnInit(): void {
    if(this.countorder!=0)
    {
      this.showimage=true;
    }
    this.adminName=this.authenticate.getUserName();
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:61135/order').build();
   this._hubConnection.start()
   .then(()=>
   console.log('connection start'))
   .catch(err=>{
     console.log('Error while establishing the connection')
   });
   this._hubConnection.on('BroadcastMessage', (message)=>{
    console.log(message.quintity);
    console.log(message);
    this.signaldata.push(message);
    localStorage.setItem('ordercount',JSON.stringify(this.countorder+1));
    this.countorder=parseInt(localStorage.getItem('ordercount'));
    this.showimage=true;
  })
}
LogOut()
{
   this.authenticate.logout();
}
}
