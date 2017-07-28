import { Component } from '@angular/core';
import {TaskService} from './services/task.service';
import {wishService} from './services/wishlist.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[TaskService,wishService]
})
export class AppComponent { }
