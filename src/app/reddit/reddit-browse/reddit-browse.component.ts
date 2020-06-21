import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
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
  beforeAfter$: BehaviorSubject<{ before: string | null, after: string | null }>;
  pageSizes = [5, 10, 25];
  subreddits = ['redditdev', 'sweden', 'angular2', 'typescript', 'webdev'];

  @ViewChild('paginator') paginator;
  @ViewChild('subredditselect') subredditselect;


  constructor(
    private readonly redditService: RedditService,
  ) {}

  ngOnInit() {
    this.beforeAfter$ = new BehaviorSubject({ before: null, after: null });
  }

  ngAfterViewInit() {
    this.initList();
  }

  initList() {
    const DEFAULT_PAGINATOR_STATE = {
      pageSize: this.pageSizes[1],
    };

    const DEFAULT_SUBREDDIT_SELECTOR_STATE = {
      subreddit: this.subreddits[0],
    };

    this.subredditselect.form.patchValue(DEFAULT_SUBREDDIT_SELECTOR_STATE, { emitEvent: false });
    this.paginator.form.patchValue(DEFAULT_PAGINATOR_STATE, { emitEvent: false });

    const subredditChanges$ = this.subredditselect.form.valueChanges.pipe(
      share(),
      startWith(DEFAULT_SUBREDDIT_SELECTOR_STATE),
    );

    const paginatorChanges$ = this.paginator.form.valueChanges.pipe(
      share(),
      startWith(DEFAULT_PAGINATOR_STATE),
    );


    // connect pagination
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

    // prepare listing query
    const listResponse$ = combineLatest([
      subredditChanges$,
      paginatorChanges$,
      prevNextClicks$,
    ]).pipe(
      debounceTime(500),
      map(([{ subreddit }, { pageSize }, beforeAfter]) => {
        return beforeAfter
          ? { subreddit, params: { limit: pageSize, count: pageSize, ...beforeAfter } }
          : { subreddit, params: { limit: pageSize } };
      }),
      switchMap(({ subreddit, params }) => this.redditService.getSubredditPosts(subreddit, params)),
      tap(({ data: { before, after } }) => this.beforeAfter$.next({ before, after })),
      share(),
    );

    // ...mitigation the ...AfterItHasBeenChecked errors caused by assignments done in AfterViewInit
    setTimeout(() => {
      this.currentSubreddit$ = subredditChanges$.pipe(
        map(({ subreddit }) => subreddit),
      );

      this.currentList$ = listResponse$.pipe(
        unwrapPostsFromResponse(),
      );
    });

  }
}
