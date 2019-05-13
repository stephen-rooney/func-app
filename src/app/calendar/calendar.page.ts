import { Component, OnInit } from '@angular/core';
import { TaskDaySummary } from '../models/task-day-summary.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage implements OnInit {

  taskDaySummaryItems: TaskDaySummary[];

  constructor(private taskService: TasksService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getSummary();
  }

  getSummary() {
    this.taskDaySummaryItems = this.taskService.getDailySummary();
  }
}
