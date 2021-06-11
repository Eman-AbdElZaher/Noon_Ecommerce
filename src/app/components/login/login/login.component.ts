import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ILogin } from 'src/app/models/Interfaces/ILogin';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoggedUser:ILogin;
  invalidLogin: boolean;
  LoginForm:FormGroup;
  res:any;

  get userEmail ()
  {
    return this.LoginForm.get('userEmail');
  }
  get password(){
    return this.LoginForm.get('password');
  }

  constructor(private fb:FormBuilder,private accountservice:AuthenticationService,private router: Router) { }
    
  
  ngOnInit(): void {
    this.LoginForm=this.fb.group({
      userEmail :['',[Validators.required]],
      password:['',[Validators.required]]
    });
  
  }
  
  signIn() {  
    this.LoggedUser={
      email:this.userEmail.value,
      password:this.password.value
    }
    this.accountservice.login(this.LoggedUser)  
          .subscribe(
              data => {
                  console.log(data);
                  this.router.navigate(['home']);
              },
              error => {
                  console.log(error);
                  this.invalidLogin=true;
              });
  } 

}
