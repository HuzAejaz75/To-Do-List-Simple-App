import { Component } from '@angular/core';
import {wishService} from './services/wishlist.service';
import {wish} from '../wish';


@Component({
  moduleId: module.id,
  selector: 'wishlist',
  templateUrl: 'wishlist.component.html',
 
})
export class WishListComponent { 
wishes: wish[];
wishTitle:string;
wishStarted:boolean;
wasClicked:boolean;
seconds: number = 0;
isActive:boolean;




 



constructor(private wishservice: wishService){
  this.wishservice.getWish().subscribe(wishes => {this.wishes = wishes});
  

}


addWish(event){
event.preventDefault();
var newWish = {
  iWish:this.wishTitle,
  wishStarted:false,
  WishDone: false,
  secondsDone:0,
  isActive: false


}//object created


this.wishservice.addWish(newWish).subscribe(wi =>{
  this.wishes.push(wi);
  this.wishTitle='';
});



}
workStatus(wish){
  console.log( 'execution cycle begins');//1
  var updWish = {
    _id:wish._id,
    iWish: wish.iWish,
    WishDone: wish.WishDone,
    wishStarted: !wish.wishStarted,
    secondsDone: wish.secondsDone,
    isActive: !wish.isActive
  }

  this.wishservice.updateWish(updWish).subscribe(wish => {
   wish.isActive = !(wish.isActive);
    
  });
  //console.log( wish.wishStarted);
  if( wish.isActive){//wish.wishStarted &&
   // var todays = new Date().getTime();
    this.timeout(0,wish);
  }
  
}
onClick() {
        this.wasClicked= !this.wasClicked;
  }

deleteWish(id){
  var wishes = this.wishes;
this.wishservice.deleteWish(id).subscribe(data => { 
 if(data.n==1){
   for(var i = 0; i <wishes.length;i++){
     if(wishes[i]._id == id){
          wishes.splice(i,1);
     }
   }
 }

});
}

 /*timeout(seconds) {
      var that = this;
      var today = new Date().getTime();
      var tomorrow = today + 24*60*60*1000;
      //var endTime = d.getHours();
       
      setTimeout(function () {
        
        seconds++;
       // var now = new Date().getTime();
        var timeleft = tomorrow - seconds;
          console.log("time left is " + timeleft);
          that.timeout(seconds);
      }, 1000);
  }*/ 
    timeout( seconds,wish) {
      var that = this;
      var today = new Date().getTime();
      this.wishservice.getSingleWish(wish).subscribe(data =>{ 
        if(!(data.isActive)){
          console.log('look it says inactive');
        }
      });
      if(seconds < 86400 && wish.isActive){
        setTimeout(function () {
        seconds++;
        console.log(seconds);
        that.timeout(seconds,wish);
        }, 1000);
    }else{
        console.log('timer stopped');
      }

  
    
  }
  
}






