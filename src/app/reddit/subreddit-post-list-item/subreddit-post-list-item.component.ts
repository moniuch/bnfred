import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RedditSubredditPost } from '../models';

@Component({
  selector: 'app-subreddit-post-list-item',
  templateUrl: './subreddit-post-list-item.component.html',
  styleUrls: ['./subreddit-post-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubredditPostListItemComponent {
  @Input() post: RedditSubredditPost;
  @Input() subreddit: string;

  get hasThumbnail(): boolean {
    return !!this.post.thumbnail && this.post.thumbnail !== 'self';
  }
}
