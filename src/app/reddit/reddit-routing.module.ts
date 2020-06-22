import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedditPageComponent } from './reddit-page/reddit-page.component';
import { SubredditPostFullViewComponent } from './subreddit-post-full-view/subreddit-post-full-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RedditPageComponent},
  { path: ':subreddit/:name', component: SubredditPostFullViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedditRoutingModule {}
