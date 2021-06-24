import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/models/Interfaces/iuser';
import { UserService } from 'src/app/services/user.service';
declare var $:any;
@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.scss']
})
export class RegisteradminComponent implements OnInit {
  userModel=new Iuser('','','','');
  constructor(private userService:UserService,private router:Router) { }
  ngOnInit(): void {
    this.resetForm();
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
  
  resetForm(form? : NgForm){
    if(form !=null)
      form.reset();
    this.userModel= {
      userName : '',
      password : '',
      email:'',
      confirmpassword :''
    }
  }
  errorMsg='';
  OnSubmit(form : NgForm){
    this.userService.registerAdmin(this.userModel).subscribe(
      userData=>
      {
        console.log(userData);
        this.router.navigate(['/login/login']);
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }

    );
  }
}
