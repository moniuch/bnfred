import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedditBrowseComponent } from './reddit-browse/reddit-browse.component';

const routes: Routes = [
  { path: '', component: RedditBrowseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedditRoutingModule {}
