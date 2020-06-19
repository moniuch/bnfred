import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RedditSubredditPostsResponse } from '../models';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-reddit-browse',
  templateUrl: './reddit-browse.component.html',
  styleUrls: ['./reddit-browse.component.scss'],
})
export class RedditBrowseComponent implements OnInit {
  currentList$: Observable<RedditSubredditPostsResponse>;
  currentSubreddit$: Observable<string>;

  constructor(
    private readonly redditService: RedditService,
  ) {}


  ngOnInit() {
    this.initList();
  }

  initList() {
    this.currentSubreddit$ = of('sweden');

    this.currentList$ = this.currentSubreddit$.pipe(
      filter(Boolean),
      switchMap(subreddit => this.redditService.getSubredditPosts(subreddit)),
      map(({ data }) => (data.children || []).map(post => post.data)),
    );


  }
}
