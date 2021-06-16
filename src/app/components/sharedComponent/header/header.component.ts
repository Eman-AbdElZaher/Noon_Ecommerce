import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean=false;
  username:any;
  constructor(private authService:AuthenticationService ) { }
  @Output() childData =new EventEmitter();
  ngOnInit(): void {
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
