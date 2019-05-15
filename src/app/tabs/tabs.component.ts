import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { MenuService } from '../goals/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})


export class TabsComponent implements OnInit {

  goalsSet = false;
  subscription: Subscription;

  constructor(private menuService: MenuService) {
    this.subscription = menuService.btnSetGoalsClick$.subscribe(
      () => {
        this.goalsSet = true;
      }
    );
  }

  ngOnInit() {
    this.checkGoals();
  }

  checkGoals() {
    this.goalsSet = localStorage.getItem('goals') !== null;
  }

}
