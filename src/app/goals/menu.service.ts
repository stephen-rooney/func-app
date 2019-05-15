import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {

    public btnSetGoalsClickSource = new Subject();

    btnSetGoalsClick$ = this.btnSetGoalsClickSource.asObservable();

    setGoals() {
        this.btnSetGoalsClickSource.next();
    }

}
