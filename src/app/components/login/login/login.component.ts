import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ILogin } from 'src/app/models/Interfaces/ILogin';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $:any;

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
  ngAfterViewInit(){
    $(document).ready(function(){
      $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass(' fa-eye-slash');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('fa-eye');
            $(this).find('i').removeClass('fa-eye-slash');
            showPass = 0;
        }
        
    });
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
                  // this.router.navigate(['/home']); 
                  console.log(this.accountservice.getRole());
                  if(this.accountservice.getRole()=="User")
                  {
                    console.log(this.accountservice.getRole());
                    this.router.navigate(['/home']);
                  }
                  else if(this.accountservice.getRole()=="Admin")
                  {
                    console.log(this.accountservice.getRole());
                    this.router.navigate(['/dashboard/panel']);
                  }
              },
              error => {
                  console.log(error);
                  this.invalidLogin=true;
              });
  } 

}
