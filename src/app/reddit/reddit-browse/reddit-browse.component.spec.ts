import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditBrowseComponent } from './reddit-browse.component';

describe('RedditBrowseComponent', () => {
  let component: RedditBrowseComponent;
  let fixture: ComponentFixture<RedditBrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditBrowseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
