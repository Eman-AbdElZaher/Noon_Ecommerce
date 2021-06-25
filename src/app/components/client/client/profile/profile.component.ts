import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ResetPasswordDto } from 'src/app/models/Interfaces/resetPassword';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName:string;
  userEmail:string;
  userPassword:ResetPasswordDto;
  PasswordChanged:boolean=false;

  constructor(
    private _authentication:AuthenticationService,
    private _router:Router,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    this.userName=this._authentication.getUserName();
    this.userEmail=this._authentication.getUserEmail();
  }
  resetPaswordform=this.fb.group({
    OldPassword:['',Validators.required],
    newPassword:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]]
  })
  get formFields() { return this.resetPaswordform.controls; }
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
  
  ResetPassword()
  {
    this.userPassword={
      "currentPassword":this.formFields.OldPassword.value,
      "newPassword":this.formFields.newPassword.value,
     } 
     console.log(this.userPassword);
     this._authentication.ChangePassword(this.userPassword).subscribe(data=>{
      if(data){
        console.log(" Password changed successfully");
        this.PasswordChanged=true;
        this._authentication.logout();
        
        this._router.navigate(["/login/login"]);
      }
    },(err)=>
    {
      console.log("not correct");
    })
    }
  signout(){
    this._authentication.logout();
  }
}
