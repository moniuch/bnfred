import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RedditSubredditPostWithComments } from '../models';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-subreddit-post-full-view',
  templateUrl: './subreddit-post-full-view.component.html',
  styleUrls: ['./subreddit-post-full-view.component.scss'],
})
export class SubredditPostFullViewComponent implements OnInit {
  postWithComments$: Observable<RedditSubredditPostWithComments>;

  constructor(
    private readonly redditService: RedditService,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initPost();
  }

  initPost() {
    this.postWithComments$ = this.route.paramMap.pipe(
      switchMap(params => this.redditService.getFullPost(params.get('subreddit'), params.get('name'))),
    );
  }
}
