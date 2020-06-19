import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedditBrowseComponent } from './reddit-browse/reddit-browse.component';
import { SubredditPostFullViewComponent } from './subreddit-post-full-view/subreddit-post-full-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RedditBrowseComponent},
  { path: ':subreddit/:name', component: SubredditPostFullViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedditRoutingModule {}
