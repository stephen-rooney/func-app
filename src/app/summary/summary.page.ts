import { Component, OnInit } from '@angular/core';
import { TaskDaySummary } from '../models/task-day-summary.model';
import { TasksService } from '../tasks.service';
import { CategorySummary } from '../models/category-summary.model';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { GoalItem } from '../models/goal-item.model';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  summaryTotals: CategorySummary[];
  goals: GoalItem[];
  infActual = 0;
  strActual = 0;
  revActual = 0;
  infGoal = 0;
  strGoal = 0;
  revGoal = 0;


  constructor(private taskService: TasksService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.summaryTotals = this.taskService.getCategoryTotals();
    this.goals = this.taskService.getGoals();
    this.buildSummary();
  }

  buildSummary() {
    const infTotal =
      (this.summaryTotals.find(ih => ih.category === 'Infrastructure').hours * 60)
      + (this.summaryTotals.find(im => im.category === 'Infrastructure').mins);
    const strTotal =
      (this.summaryTotals.find(sh => sh.category === 'Strategy').hours * 60)
      + (this.summaryTotals.find(sm => sm.category === 'Strategy').mins);
    const revTotal =
      (this.summaryTotals.find(rh => rh.category === 'Revenue').hours * 60)
      + (this.summaryTotals.find(rm => rm.category === 'Revenue').mins);
    const grandTotal = infTotal + strTotal + revTotal;

    this.infActual = Math.floor((infTotal / grandTotal) * 100);
    this.strActual = Math.floor((strTotal / grandTotal) * 100);
    this.revActual = 100 - (this.infActual + this.strActual);

    if (this.goals.length > 0) {
      this.infGoal = this.goals.find(ip => ip.category === 'Infrastructure').percentage
        === null ? 0 : this.goals.find(ip => ip.category === 'Infrastructure').percentage;
      this.strGoal = this.goals.find(sp => sp.category === 'Strategy').percentage
        === null ? 0 : this.goals.find(ip => ip.category === 'Strategy').percentage;
      this.revGoal = this.goals.find(rp => rp.category === 'Revenue').percentage
        === null ? 0 : this.goals.find(ip => ip.category === 'Revenue').percentage;
    }
  }

}
