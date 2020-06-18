import { Component, OnInit } from '@angular/core';
import { RedditService } from '../reddit.service';

@Component({
  selector: 'app-reddit-browse',
  templateUrl: './reddit-browse.component.html',
  styleUrls: ['./reddit-browse.component.scss'],
})
export class RedditBrowseComponent implements OnInit {

  constructor(
    private readonly redditService: RedditService,
  ) { }

  ngOnInit() {
    this.redditService.getSubredditPosts('sweden').subscribe(console.log);
  }

}
