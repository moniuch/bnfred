import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RedditBrowseComponent } from './reddit-browse/reddit-browse.component';
import { RedditRoutingModule } from './reddit-routing.module';
import { SubredditPostFullViewComponent } from './subreddit-post-full-view/subreddit-post-full-view.component';
import { SubredditPostListItemComponent } from './subreddit-post-list-item/subreddit-post-list-item.component';
import { SubredditPostListComponent } from './subreddit-post-list/subreddit-post-list.component';

@NgModule({
  declarations: [
    RedditBrowseComponent,
    SubredditPostListComponent,
    SubredditPostListItemComponent,
    SubredditPostFullViewComponent,
  ],
  imports: [
    CommonModule,
    RedditRoutingModule,
  ],
})
export class RedditModule {}
