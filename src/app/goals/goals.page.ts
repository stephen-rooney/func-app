import { Component, OnInit } from '@angular/core';
import { GoalItem } from '../models/goal-item.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {

  infrastructure = 0;
  strategy = 0;
  revenue = 0;
  goals: GoalItem[] = [];


  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.taskService.getGoals();
  }

  onSetGoals() {
    const total = this.infrastructure + this.strategy + this.revenue;

    this.goals = [];

    this.goals.push(new GoalItem({
      category: 'Infrastructure',
      percentage: Math.floor((this.infrastructure / total) * 100)
    }));
    this.goals.push(new GoalItem({
      category: 'Strategy',
      percentage: Math.floor((this.strategy / total) * 100)
    }));
    this.goals.push(new GoalItem({
      category: 'Revenue',
      percentage: 100 - (Math.floor((this.infrastructure / total) * 100) + Math.floor((this.strategy / total) * 100))
    }));

    this.taskService.updateGoals(this.goals);
  }

}
