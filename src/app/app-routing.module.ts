import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'calendar',
    children: [
      {
        path: '',
        loadChildren: './calendar/calendar.module#CalendarPageModule'
      },
      {
        path: 'calendar-help',
        loadChildren: './calendar/calendar-help/calendar-help.module#CalendarHelpPageModule'
      },
      {
        path: ':day',
        loadChildren: './calendar/day/day.module#DayPageModule'
      }
    ]
  },
  {
    path: 'summary',
    loadChildren: './summary/summary.module#SummaryPageModule'
  },
  {
    path: 'goals',
    loadChildren: './goals/goals.module#GoalsPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
