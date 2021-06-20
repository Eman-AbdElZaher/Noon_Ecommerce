import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestablePassword} from 'src/app/models/Classes/RestablePassword';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userModel=new RestablePassword('','');
  userName:string;
  userEmail:string;

  constructor(private _authentication:AuthenticationService) { }

  ngOnInit(): void {
    this.resetForm();
    this.userName=this._authentication.getUserName();
    this.userEmail=this._authentication.getUserEmail();
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
  
  resetForm(form? : NgForm){
    if(form !=null)
      form.reset();
    this.userModel= {
      currentPassword : '',
      newPassword : ''
    }
  }
  OnSubmit(form : NgForm){}
  signout(){
    this._authentication.logout();
  }
}
