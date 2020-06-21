import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, map, mapTo, share, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
  beforeAfter$: BehaviorSubject<{ before: string | null, after: string | null }>;

  @ViewChild('paginator') paginator;
  @ViewChild('prev') prevBtn;
  @ViewChild('next') nextBtn;

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
      pageSize: 25,
    });

    const prevNextClicks$ = merge(
      fromEvent(this.prevBtn.nativeElement, 'click').pipe(mapTo(-1)),
      fromEvent(this.nextBtn.nativeElement, 'click').pipe(mapTo(1)),
    ).pipe(
      withLatestFrom(this.beforeAfter$),
      map(([direction, { before, after }]) => {
        console.log(direction)
        return direction < 0
          ? { before, after: null }
          : { before: null, after };
      }),
      startWith(0),
    );

    const listResponse$ = combineLatest([
      this.currentSubreddit$,
      this.paginator.form.valueChanges.pipe(startWith(this.paginator.form.value)),
      prevNextClicks$,
    ]).pipe(
      debounceTime(500),
      withLatestFrom(this.beforeAfter$),
      map(([[subreddit, { pageSize }], beforeAfter]) => ({ subreddit, params: { limit: pageSize, ...beforeAfter } })),
      switchMap(({ subreddit, params }) => this.redditService.getSubredditPosts(subreddit, params)),
      tap(({ data: { before, after } }) => this.beforeAfter$.next({ before, after })),
      share(),
    );

    this.currentList$ = listResponse$.pipe(
      map(({ data }) => (data.children || []).map(post => post.data)),
    );
  }
}
