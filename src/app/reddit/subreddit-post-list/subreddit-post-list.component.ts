import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RedditSubredditPost } from '../models';

@Component({
  selector: 'app-subreddit-post-list',
  templateUrl: './subreddit-post-list.component.html',
  styleUrls: ['./subreddit-post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubredditPostListComponent {
  @Input() posts: RedditSubredditPost[];
  @Input() subreddit: string;
}
