export class TaskDaySummary {
    day: string;
    totalTasks: number;
    totalTime: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
