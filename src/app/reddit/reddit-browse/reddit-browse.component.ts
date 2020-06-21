import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, share, startWith, switchMap } from 'rxjs/operators';
import { RedditSubredditPost } from '../models';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-reddit-browse',
  templateUrl: './reddit-browse.component.html',
  styleUrls: ['./reddit-browse.component.scss'],
})
export class RedditBrowseComponent implements OnInit, AfterViewInit {
  currentList$: Observable<RedditSubredditPost[]>;
  currentSubreddit$: Observable<string>;
  pageSizes = [5, 10, 25];
  beforeAfter$: Observable<{ before: string, after: string }>;

  @ViewChild('paginator') paginator;

  constructor(
    private readonly redditService: RedditService,
  ) {}

  ngOnInit() {
    this.currentSubreddit$ = of('sweden');
  }

  ngAfterViewInit() {
    this.initList();
  }

  initList() {
    this.paginator.form.patchValue({
      pageSize: 25,
    });

    const listResponse$ = combineLatest([
      this.currentSubreddit$,
      this.paginator.form.valueChanges.pipe(startWith(this.paginator.form.value)),
    ]).pipe(
      debounceTime(500),
      switchMap(([subreddit, { pageSize }]) => this.redditService.getSubredditPosts(subreddit, pageSize)),
      share(),
    );

    this.currentList$ = listResponse$.pipe(
      map(({ data }) => (data.children || []).map(post => post.data)),
    );

    this.beforeAfter$ = listResponse$.pipe(
      map(({ data: { before, after } }) => ({ before, after })),
    );
  }
}
