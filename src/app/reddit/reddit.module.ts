import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RedditBrowseComponent } from './reddit-browse/reddit-browse.component';
import { RedditRoutingModule } from './reddit-routing.module';

@NgModule({
  declarations: [
    RedditBrowseComponent,
  ],
  imports: [
    CommonModule,
    RedditRoutingModule,
  ],
})
export class RedditModule {}
