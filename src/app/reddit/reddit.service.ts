import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedditSubredditPostsResponse, RedditSubredditPostWithComments } from './models';
import { unwrapPostAndComments } from './utils';

const REDDIT_BASE_URL = 'https://www.reddit.com/r';

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public getSubredditPosts(subreddit: string, limit: number): Observable<RedditSubredditPostsResponse> {
    console.log('getting', subreddit, limit);
    const url = this.getSubredditUrl(subreddit);
    return this.http.get(url, { params: { limit: `${limit}` } }) as Observable<RedditSubredditPostsResponse>;
  }

  public getFullPost(subreddit: string, name: string): Observable<RedditSubredditPostWithComments> {
    const url = this.getFullPostWithCommentsUrl(subreddit, name);

    return this.http.get(url).pipe(
      unwrapPostAndComments(),
    ) as Observable<RedditSubredditPostWithComments>;
  }

  private getFullPostWithCommentsUrl(subreddit: string, name: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}/comments/${name}/.json`;
  }

  private getSubredditUrl(subreddit: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}.json`;
  }
}

