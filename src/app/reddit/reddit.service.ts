import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedditListingQueryParams, RedditSubredditPostsResponse, RedditSubredditPostWithComments } from './models';
import { unwrapPostAndCommentsFromResponse } from './utils';

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

    if (typeof count != 'undefined') {
      params = { ...params, count };
    }
    if (before) {
      params = { ...params, before };
    }
    if (after) {
      params = { ...params, after };
    }
    console.log('getting', subreddit, params);

    const url = this.getSubredditUrl(subreddit);
    return this.http.get(url, { params }) as Observable<RedditSubredditPostsResponse>;
  }

  public getFullPost(subreddit: string, name: string): Observable<RedditSubredditPostWithComments> {
    const url = this.getFullPostWithCommentsUrl(subreddit, name);

    return this.http.get(url).pipe(
      unwrapPostAndCommentsFromResponse(),
    ) as Observable<RedditSubredditPostWithComments>;
  }

  private getFullPostWithCommentsUrl(subreddit: string, name: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}/comments/${name}/.json`;
  }

  private getSubredditUrl(subreddit: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}.json`;
  }
}

