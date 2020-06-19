import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditPostListItemComponent } from './subreddit-post-list-item.component';

describe('SubredditPostComponent', () => {
  let component: SubredditPostListItemComponent;
  let fixture: ComponentFixture<SubredditPostListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubredditPostListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditPostListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
