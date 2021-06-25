import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { IAdvertisement } from 'src/app/models/Interfaces/IAdvertisement';
declare var $:any;
 
@Component({
  selector: 'app-show-aids',
  templateUrl: './show-aids.component.html',
  styleUrls: ['./show-aids.component.scss']
})
export class ShowAidsComponent implements OnInit {
  AdsList:IAdvertisement[]=[];
  errorMsg:string="";
  constructor(private AdsService:AdvertisementService) { }

  ngOnInit(): void {
    this.ShowAids();
  }
  ShowAids(){
    this.AdsService.getAllAdvertisement().subscribe(
      data=>
      {
        
           this.AdsList=data;
           console.log(data);
        
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      })
  }
  ngAfterViewInit(){
  // $('span').click(function(){
  //       $('img').hide(); 
  //       console.log("ddd");    
  //   })   
  //   }
  

  $(document).ready(function(){
    $('.remove').click(function(){
      alert("The span element was clicked.");
      // $('img').css("display","none");
      console.log("asfs");
      $('#asd').hide();
    });
  
});
  }
    


}
