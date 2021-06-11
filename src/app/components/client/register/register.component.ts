import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/Interfaces/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userModel=new Iuser('','','','');
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form !=null)
      form.reset();
    this.userModel= {
      username : '',
      password : '',
      email:'',
      confirmpassword :''
    }
  }
  errorMsg='';
  OnSubmit(form : NgForm){
    this.userService.registerUser(this.userModel).subscribe(
      userData=>
      {
        console.log(userData);
        this.router.navigate(['home']);
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }

    );
  }
}
