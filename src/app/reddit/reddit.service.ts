import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditSubredditPostsResponse, RedditSubredditPostWithComments } from './models';

const REDDIT_BASE_URL = 'https://www.reddit.com/r';

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  public getSubredditPosts(subreddit: string): Observable<RedditSubredditPostsResponse> {
    console.log('getting', subreddit);
    const url = this.getSubredditUrl(subreddit)
    return this.http.get(url) as Observable<RedditSubredditPostsResponse>;
  }

  public getFullPost(subreddit: string, name: string): Observable<RedditSubredditPostWithComments> {
    const url = this.getFullPostWithCommentsUrl(subreddit, name);

    return this.http.get(url).pipe(
      map(([postResponse, commentsResponse]) => {
        const post = postResponse.data.children[0].data;
        const comments = commentsResponse.data.children.map(({ data }) => data);

        return { post, comments };
      }),
    ) as Observable<RedditSubredditPostWithComments>;
  }

  private getFullPostWithCommentsUrl(subreddit: string, name: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}/comments/${name}/.json`;
  }

  private getSubredditUrl(subreddit: string): string {
    return `${REDDIT_BASE_URL}/${subreddit}.json`;
  }
}
