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
var task_service_1 = require("../../services/task.service");
var DoneComponent = (function () {
    function DoneComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.taskService.getTasks().subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    DoneComponent.prototype.updateStatus = function (task) {
        var _task = {
            _id: task._id,
            title: task.title,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task).subscribe(function (data) {
            task.isDone = !task.isDone;
        });
    };
    DoneComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Done',
            templateUrl: 'donetasks.component.html'
        }),
        __metadata("design:paramtypes", [task_service_1.TaskService])
    ], DoneComponent);
    return DoneComponent;
}());
exports.DoneComponent = DoneComponent;
//# sourceMappingURL=donetasks.component.js.map