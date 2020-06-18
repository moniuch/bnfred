import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const REDDIT_BASE_URL = 'https://www.reddit.com/r';

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  getSubredditPosts(subreddit: string): Observable<any> {
    return this.http.get(this.getSubredditUrl(subreddit));
  }

  private getSubredditUrl(subreddit: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}`;
  }
}
