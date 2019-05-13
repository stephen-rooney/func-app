import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: '../calendar/calendar.module#CalendarPageModule'
          },
          {
            path: ':day',
            loadChildren: '../calendar/day/day.module#DayPageModule'
          }
        ]
      },
      {
        path: 'summary',
        children: [
          {
            path: '',
            loadChildren: '../summary/summary.module#SummaryPageModule'
          }
        ]
      },
      {
        path: 'goals',
        children: [
          {
            path: '',
            loadChildren: '../goals/goals.module#GoalsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/calendar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/calendar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
