import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { TaskListItem } from './models/task-list-item.model';
import { TaskDaySummary } from './models/task-day-summary.model';
import { TaskSummaryItem } from './models/task-summary-item.model';
import { CategorySummary } from './models/category-summary.model';
import { GoalItem } from './models/goal-item.model';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private Tasks: Task[] = [
        { label: 'Accounting and Finance', category: 'Infrastructure' },
        { label: 'Administration', category: 'Infrastructure' },
        { label: 'Build(products and services)', category: 'Revenue' },
        { label: 'Compliance', category: 'Infrastructure' },
        { label: 'Client Services', category: 'Revenue' },
        { label: 'Deliver', category: 'Revenue' },
        { label: 'Human Resources', category: 'Infrastructure' },
        { label: 'Information Technology', category: 'Infrastructure' },
        { label: 'Legal', category: 'Infrastructure' },
        { label: 'Marketing', category: 'Revenue' },
        { label: 'Partnerships & Collaboration', category: 'Strategy' },
        { label: 'Positioning & Brand', category: 'Strategy' },
        { label: 'Premise Management', category: 'Infrastructure' },
        { label: 'Product architecture', category: 'Strategy' },
        { label: 'Sales', category: 'Revenue' },
        { label: 'Strategic Partners / Joint Ventures', category: 'Strategy' },
        { label: 'Vision', category: 'Strategy' }
    ];

    updateGoals(goals: GoalItem[]) {
        localStorage.setItem('goals', JSON.stringify(goals));
    }

    getGoals() {
        if (localStorage.getItem('goals') !== null) {
            return JSON.parse(localStorage.getItem('goals'));
        } else {
            return [];
        }
    }

    getCategoryTotals() {
        const summaryList: TaskSummaryItem[] = [];
        let result: TaskListItem[] = [];
        const categoryTotals: CategorySummary[] = [];

        for (let index = 0; index < 10; index++) {
            const day = 'day' + (index + 1);

            if (localStorage.getItem(day) !== null) {
                result = JSON.parse(localStorage.getItem(day));
                result.forEach(element => {
                    const task = new TaskSummaryItem();
                    task.category = element.category;
                    task.duration = element.duration;
                    summaryList.push(task);
                });
            }
        }

        const infSummary: CategorySummary = {
            category: 'Infrastructure',
            hours: 0,
            mins: 0
        };
        const strSummary: CategorySummary = {
            category: 'Strategy',
            hours: 0,
            mins: 0
        };
        const revSummary: CategorySummary = {
            category: 'Revenue',
            hours: 0,
            mins: 0
        };

        summaryList.forEach(element => {
            switch (element.category) {
                case 'Infrastructure': {
                    infSummary.hours += +element.duration.split(':')[0];
                    infSummary.mins += +element.duration.split(':')[1];
                    break;
                }
            }
            switch (element.category) {
                case 'Strategy': {
                    strSummary.hours += +element.duration.split(':')[0];
                    strSummary.mins += +element.duration.split(':')[1];
                    break;
                }
            }
            switch (element.category) {
                case 'Revenue': {
                    revSummary.hours += +element.duration.split(':')[0];
                    revSummary.mins += +element.duration.split(':')[1];
                    break;
                }
            }
        });

        if (infSummary.mins > 59) {
            infSummary.hours += Math.floor(infSummary.mins / 60);
            infSummary.mins = infSummary.mins % 60;
        }
        if (strSummary.mins > 59) {
            strSummary.hours += Math.floor(strSummary.mins / 60);
            strSummary.mins = strSummary.mins % 60;
        }
        if (revSummary.mins > 59) {
            revSummary.hours += Math.floor(revSummary.mins / 60);
            revSummary.mins = revSummary.mins % 60;
        }

        categoryTotals.push(infSummary, strSummary, revSummary);

        return categoryTotals;
    }

    getDailySummary() {
        const summary: TaskDaySummary[] = [];
        let result: TaskListItem[] = [];

        for (let i = 1; i < 11; i++) {
            const day = 'day' + i;
            const item = new TaskDaySummary();
            if (localStorage.getItem(day) !== null) {
                result = JSON.parse(localStorage.getItem(day));
                let hours = 0;
                let mins = 0;
                for (const r of result) {
                    mins += +r.duration.split(':')[1];
                    hours += +r.duration.split(':')[0];
                }
                hours += Math.floor(mins / 60);
                mins = mins % 60;
                item.day = day;
                item.totalTasks = result.length;
                item.totalTime = `${this.pad(hours, 2)}:${this.pad(mins, 2)}`;
            } else {
                item.day = day;
                item.totalTasks = 0;
                item.totalTime = '00:00';
            }
            summary.push(item);
        }
        return summary;
    }

    pad(num, size) {
        let s = num + '';
        while (s.length < size) { s = '0' + s; }
        return s;
    }

    getTasks() {
        return this.Tasks;
    }

    getTaskListItems(day: string) {
        let tasks: TaskListItem[];

        if (localStorage.getItem(day) === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem(day));
        }

        return tasks;
    }

    updateTaskListItems(list: TaskListItem[]) {
        localStorage.setItem(list[0].day, JSON.stringify(list));
    }
}
