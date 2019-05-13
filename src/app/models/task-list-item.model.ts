export class TaskListItem {
    id: number;
    day: string;
    task: string;
    category: string;
    duration: string;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
