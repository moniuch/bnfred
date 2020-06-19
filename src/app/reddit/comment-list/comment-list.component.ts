import { Component, Input, OnInit } from '@angular/core';
import { RedditComment } from '../models';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comments: RedditComment[];

  constructor() { }

  ngOnInit(): void {
  }

}
