import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'noon-E-commerce';
  isAdmin:boolean=false;
  constructor(private authenticate:AuthenticationService){}
  ngOnInit(): void
  {
      if(this.authenticate.getRole()=="Admin")
      {
        this.isAdmin=true;
        console.log(this.isAdmin);
      }
  }
}
