import { Component, Input, OnInit } from '@angular/core';
import { RedditComment } from '../models';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: RedditComment;

  constructor() { }

  ngOnInit(): void {
  }

}
