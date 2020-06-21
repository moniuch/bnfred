import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, of } from 'rxjs';
import { debounceTime, map, mapTo, share, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RedditSubredditPost } from '../models';
import { RedditService } from '../reddit.service';
import { unwrapPostsFromResponse } from '../utils';

@Component({
  selector: 'app-reddit-browse',
  templateUrl: './reddit-browse.component.html',
  styleUrls: ['./reddit-browse.component.scss'],
})
export class RedditBrowseComponent implements OnInit, AfterViewInit {
  currentList$: Observable<RedditSubredditPost[]>;
  currentSubreddit$: Observable<string>;
  pageSizes = [5, 10, 25];
  beforeAfter$: BehaviorSubject<{ before: string | null, after: string | null }>;

  @ViewChild('paginator') paginator;

  constructor(
    private readonly redditService: RedditService,
  ) {}

  ngOnInit() {
    this.currentSubreddit$ = of('sweden');
    this.beforeAfter$ = new BehaviorSubject({ before: null, after: null });
  }

  ngAfterViewInit() {
    this.initList();
  }

  initList() {
    this.paginator.form.patchValue({
      pageSize: 5,
    });

    const prevNextClicks$ = merge(
      this.paginator.next.pipe(mapTo(1)),
      this.paginator.prev.pipe(mapTo(-1)),
    ).pipe(
      withLatestFrom(this.beforeAfter$),
      map(([direction, beforeAfter]) => {
        if (!!beforeAfter) {
          const { before, after } = beforeAfter;
          return direction < 0 ? { after: before } : { after: after };
        }
      }),
      startWith(null),
    );

    const listResponse$ = combineLatest([
      this.currentSubreddit$,
      this.paginator.form.valueChanges.pipe(startWith(this.paginator.form.value)),
      prevNextClicks$,
    ]).pipe(
      debounceTime(500),
      map(([subreddit, { pageSize }, beforeAfter]) => {
        return beforeAfter
          ? { subreddit, params: { limit: pageSize, count: pageSize, ...beforeAfter } }
          : { subreddit, params: { limit: pageSize } };
      }),
      switchMap(({ subreddit, params }) => this.redditService.getSubredditPosts(subreddit, params)),
      tap(({ data: { before, after } }) => this.beforeAfter$.next({ before, after })),
      share(),
    );

    this.currentList$ = listResponse$.pipe(
      unwrapPostsFromResponse(),
    );
  }
}
