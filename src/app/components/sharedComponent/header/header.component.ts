import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _hubConnection: HubConnection;
  private hubconntectionwishlist:HubConnection;
  private deletecart:HubConnection;
  private deletewishlist:HubConnection;
  showimage: boolean=false;
  signaldata: any[]=[];
  signaldataa:any[]=[];
  loggedIn:boolean=false;
  showwishlist:boolean=false;
  username:any;
  countcart:number= localStorage.getItem('count')?parseInt(localStorage.getItem('count')):0;
  countwishliat:number=localStorage.getItem('countwishlist')?parseInt(localStorage.getItem('countwishlist')):0;
  constructor(private authService:AuthenticationService,private http: HttpClient) { }
  @Output() childData =new EventEmitter();
  ngOnInit(): void {
    console.log(this.countcart,'count');
    if(this.countcart!=0)
    {
      this.showimage=true;
    }
    if(this.countwishliat!=0)
    {
      this.showwishlist=true;
    }
   this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:61135/notify').build();
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
   localStorage.setItem('count',JSON.stringify(this.countcart+1));
   this.countcart=parseInt(localStorage.getItem('count'));
   this.showimage=true;
  })
  ////////////////////////////////////////wishlisthub
  this.hubconntectionwishlist = new HubConnectionBuilder().withUrl('http://localhost:61135/wishList').build();
  this.hubconntectionwishlist.start()
  .then(()=>
  console.log('connection start'))
  .catch(err=>{
    console.log('Error while establishing the connection')
  });
  this.hubconntectionwishlist.on('BroadcastMessage', (wishlist)=>{
   this.signaldataa.push(wishlist);
   console.log(this.signaldataa.length);
   localStorage.setItem('countwishlist',JSON.stringify(this.countwishliat+1));
   this.countwishliat=parseInt(localStorage.getItem('countwishlist'));
   this.showwishlist=true;
 })
 ///////////////////////DeleteCartProduct
 this.deletecart = new HubConnectionBuilder().withUrl('http://localhost:61135/deletecartproduct').build();
   this.deletecart.start()
   .then(()=>
   console.log('connection start'))
   .catch(err=>{
     console.log('Error while establishing the connection')
   });
  
   this.deletecart.on('BroadcastMessage', (message)=>{
   console.log(message.quintity);
   console.log(message);
   this.signaldata.push(message);
   localStorage.setItem('count',JSON.stringify(this.countcart-message.quintity));
   this.countcart=parseInt(localStorage.getItem('count'));
   this.showimage=true;
  })
  ////////////////DeleteWishList
  this.deletewishlist = new HubConnectionBuilder().withUrl('http://localhost:61135/deletewishList').build();
  this.deletewishlist.start()
  .then(()=>
  console.log('connection start'))
  .catch(err=>{
    console.log('Error while establishing the connection')
  });
  this.deletewishlist.on('BroadcastMessage', (wishlist)=>{
   this.signaldataa.push(wishlist);
   console.log(this.signaldataa.length);
   localStorage.setItem('countwishlist',JSON.stringify(this.countwishliat-1));
   this.countwishliat=parseInt(localStorage.getItem('countwishlist'));
   this.showwishlist=true;
 })
   this.loggedIn=this.authService.isLoggedIn();
   this.username= this.authService.getUserName();
   console.log(this.username);
  } 
  fireData()
  {
    this.childData.emit(this.authService.getRole());  //$event
  }
  LoggedOut()
  {
    this.authService.logout();
  }
}
