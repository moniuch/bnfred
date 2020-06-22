import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentListItemComponent } from './comment-list-item/comment-list-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RedditPageComponent } from './reddit-page/reddit-page.component';
import { RedditRoutingModule } from './reddit-routing.module';
import { RedditUnixDatePipe } from './reddit-unix-date.pipe';
import { SubredditPostFullViewComponent } from './subreddit-post-full-view/subreddit-post-full-view.component';
import { SubredditPostListItemComponent } from './subreddit-post-list-item/subreddit-post-list-item.component';
import { SubredditPostListComponent } from './subreddit-post-list/subreddit-post-list.component';
import { SubredditSelectorComponent } from './subreddit-selector/subreddit-selector.component';

@NgModule({
  declarations: [
    RedditPageComponent,
    SubredditPostListComponent,
    SubredditPostListItemComponent,
    SubredditPostFullViewComponent,
    CommentListComponent,
    CommentListItemComponent,
    RedditUnixDatePipe,
    PaginatorComponent,
    SubredditSelectorComponent,
  ],
  imports: [
    CommonModule,
    RedditRoutingModule,
    ReactiveFormsModule,
  ],
})
export class RedditModule {}
