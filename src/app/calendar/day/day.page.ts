import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskListItem } from '../../models/task-list-item.model';
import { TasksService } from '../../tasks.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-day',
  templateUrl: './day.page.html',
  styleUrls: ['./day.page.scss'],
})
export class TaskListPage implements OnInit {
  day: string;
  title: string;
  duration: any = '00:00:00';
  tasks: Task[];
  taskListItems: TaskListItem[];
  taskListItem: TaskListItem;
  selectedTask: any;

  constructor(
    private taskService: TasksService,
    private alertCtrl: AlertController,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.day = this.activeRoute.snapshot.paramMap.get('day');
    this.title = this.day.substring(3);
    this.tasks = this.taskService.getTasks();
    this.taskListItems = this.taskService.getTaskListItems(this.day);
  }

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter');
  // }

  onClear() {
    this.duration = '00:00:00';
    this.selectedTask = null;
  }

  onDelete(e) {
    console.log(e);
    this.taskListItems = this.taskListItems.filter(
      item => item.id !== e
    );
    this.taskService.updateTaskListItems(this.taskListItems);
  }

  onAddItem() {
    if (this.selectedTask === null || this.duration === '00:00:00') {
      this.alertCtrl.create({ message: 'Please enter task and duration!', header: 'Invalid inputs!', buttons: ['OK'] })
        .then(alertElement => {
          alertElement.present();
        });
      return;
    }

    let newId = 1;
    if (this.taskListItems.length > 0) {
      newId = Math.max(...this.taskListItems.map(item => item.id)) + 1;
    }

    // const time = this.duration.split(':');
    const taskListItem = new TaskListItem({
      id: newId,
      day: this.day,
      task: this.selectedTask,
      category: this.tasks.find((item) => item.label === this.selectedTask).category,
      duration: this.duration.substring(3)
    });
    this.taskListItems.unshift(taskListItem);
    this.taskService.updateTaskListItems(this.taskListItems);
    this.onClear();
  }
}
