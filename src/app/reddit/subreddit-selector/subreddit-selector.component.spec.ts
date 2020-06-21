import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditSelectorComponent } from './subreddit-selector.component';

describe('SubredditSelectorComponent', () => {
  let component: SubredditSelectorComponent;
  let fixture: ComponentFixture<SubredditSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubredditSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
