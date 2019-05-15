import { Component, OnInit } from '@angular/core';
import { GoalItem } from '../models/goal-item.model';
import { TasksService } from '../tasks.service';
import { MenuService } from './menu.service';

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


  constructor(private taskService: TasksService, private menuService: MenuService) { }

  ngOnInit() {
    this.taskService.getGoals();
  }

  onSetGoals() {
    const total = this.infrastructure + this.strategy + this.revenue;

    this.goals = [];

    this.goals.push(new GoalItem({
      category: 'Infrastructure',
      percentage: this.infrastructure === 0 ? 0 : Math.floor((this.infrastructure / total) * 100)
    }));
    this.goals.push(new GoalItem({
      category: 'Strategy',
      percentage: this.strategy === 0 ? 0 : Math.floor((this.strategy / total) * 100)
    }));
    this.goals.push(new GoalItem({
      category: 'Revenue',
      percentage: this.revenue === 0
        ? 0 : 100 - (Math.floor((this.infrastructure / total) * 100) + Math.floor((this.strategy / total) * 100))
    }));

    this.taskService.updateGoals(this.goals);

    this.menuService.setGoals();
  }

}
