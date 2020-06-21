import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RedditComment } from '../models';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListItemComponent {
  @Input() comment: RedditComment;
}
