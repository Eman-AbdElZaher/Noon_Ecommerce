import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {
adminName:string;
  constructor(private authenticate:AuthenticationService) { }

  ngOnInit(): void {
    this.adminName=this.authenticate.getUserName();
  }
LogOut()
{
   this.authenticate.logout();
}
}
