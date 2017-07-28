import{Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import{Task} from '../../../Task';
import {TasksComponent} from '../tasks/tasks.component'
@Component({
    moduleId:module.id,
    selector:'Done',
    templateUrl:'donetasks.component.html'
})

export class DoneComponent{
  tasks:Task[];
  title:string;
constructor(private taskService: TaskService){
    this.taskService.getTasks().subscribe(tasks =>{
this.tasks = tasks;
     
    } );
  
}
  updateStatus(task){
    var _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    }
    this.taskService.updateStatus(_task).subscribe(data => {
      task.isDone = !task.isDone; 
    });
    
   
  }
}


