export class GoalItem {
    category: string;
    percentage: number;

    constructor(values: object = {}) {
        Object.assign(this, values);
    }
}
