import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditPostListComponent } from './subreddit-post-list.component';

describe('SubredditPostsComponent', () => {
  let component: SubredditPostListComponent;
  let fixture: ComponentFixture<SubredditPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubredditPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
