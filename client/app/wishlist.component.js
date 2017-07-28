"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wishlist_service_1 = require("./services/wishlist.service");
var WishListComponent = (function () {
    function WishListComponent(wishservice) {
        var _this = this;
        this.wishservice = wishservice;
        this.seconds = 0;
        this.wishservice.getWish().subscribe(function (wishes) { _this.wishes = wishes; });
    }
    WishListComponent.prototype.addWish = function (event) {
        var _this = this;
        event.preventDefault();
        var newWish = {
            iWish: this.wishTitle,
            wishStarted: false,
            WishDone: false,
            secondsDone: 0,
            isActive: false
        }; //object created
        this.wishservice.addWish(newWish).subscribe(function (wi) {
            _this.wishes.push(wi);
            _this.wishTitle = '';
        });
    };
    WishListComponent.prototype.workStatus = function (wish) {
        console.log('execution cycle begins'); //1
        var updWish = {
            _id: wish._id,
            iWish: wish.iWish,
            WishDone: wish.WishDone,
            wishStarted: !wish.wishStarted,
            secondsDone: wish.secondsDone,
            isActive: !wish.isActive
        };
        this.wishservice.updateWish(updWish).subscribe(function (wish) {
            wish.isActive = !(wish.isActive);
        });
        //console.log( wish.wishStarted);
        if (wish.isActive) {
            // var todays = new Date().getTime();
            this.timeout(0, wish);
        }
    };
    WishListComponent.prototype.onClick = function () {
        this.wasClicked = !this.wasClicked;
    };
    WishListComponent.prototype.deleteWish = function (id) {
        var wishes = this.wishes;
        this.wishservice.deleteWish(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < wishes.length; i++) {
                    if (wishes[i]._id == id) {
                        wishes.splice(i, 1);
                    }
                }
            }
        });
    };
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
    WishListComponent.prototype.timeout = function (seconds, wish) {
        var that = this;
        var today = new Date().getTime();
        this.wishservice.getSingleWish(wish).subscribe(function (data) {
            if (!(data.isActive)) {
                console.log('look it says inactive');
            }
        });
        if (seconds < 86400 && wish.isActive) {
            setTimeout(function () {
                seconds++;
                console.log(seconds);
                that.timeout(seconds, wish);
            }, 1000);
        }
        else {
            console.log('timer stopped');
        }
    };
    WishListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wishlist',
            templateUrl: 'wishlist.component.html',
        }),
        __metadata("design:paramtypes", [wishlist_service_1.wishService])
    ], WishListComponent);
    return WishListComponent;
}());
exports.WishListComponent = WishListComponent;
//# sourceMappingURL=wishlist.component.js.map