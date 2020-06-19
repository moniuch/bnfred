import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditPostFullViewComponent } from './subreddit-post-full-view.component';

describe('SubredditPostFullViewComponent', () => {
  let component: SubredditPostFullViewComponent;
  let fixture: ComponentFixture<SubredditPostFullViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubredditPostFullViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditPostFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
