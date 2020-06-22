import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedditListingQueryParams, RedditSubredditPostsResponse } from './models';

const REDDIT_BASE_URL = 'https://www.reddit.com/r';

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public getSubredditPosts(
    subreddit: string, listingQueryParams: RedditListingQueryParams): Observable<RedditSubredditPostsResponse> {
    const { before, after, limit, count } = listingQueryParams;
    let params: any = { limit: `${limit}` };

    if (count) {
      params = { ...params, count };
    }
    if (before) {
      params = { ...params, before };
    }
    if (after) {
      params = { ...params, after };
    }

    const url = this.getSubredditUrl(subreddit);
    return this.http.get(url, { params }) as Observable<RedditSubredditPostsResponse>;
  }

  public getFullPost(subreddit: string, name: string): Observable<[any, any]> {
    const url = this.getFullPostWithCommentsUrl(subreddit, name);
    return this.http.get(url) as Observable<[any, any]>;
  }

  private getFullPostWithCommentsUrl(subreddit: string, name: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}/comments/${name}/.json`;
  }

  private getSubredditUrl(subreddit: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}.json`;
  }
}

