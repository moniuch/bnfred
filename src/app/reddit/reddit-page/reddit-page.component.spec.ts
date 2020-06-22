import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditPageComponent } from './reddit-page.component';

describe('RedditBrowseComponent', () => {
  let component: RedditPageComponent;
  let fixture: ComponentFixture<RedditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
