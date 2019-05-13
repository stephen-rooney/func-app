import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHelpPage } from './calendar-help.page';

describe('CalendarHelpPage', () => {
  let component: CalendarHelpPage;
  let fixture: ComponentFixture<CalendarHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarHelpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
