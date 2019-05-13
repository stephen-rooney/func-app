export class TaskSummaryItem {
    category: string;
    duration: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
