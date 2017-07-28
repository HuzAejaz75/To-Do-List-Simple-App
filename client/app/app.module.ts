import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {WishListComponent} from './wishlist.component';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
//import {DoneComponent} from './components/donetasks/donetasks.component';
//DoneComponent
const appRoutes: Routes = [
  {path:'',component:TasksComponent},
  {path:'wishlist',component:WishListComponent}
] 
@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [AppComponent, TasksComponent, WishListComponent, NavComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
