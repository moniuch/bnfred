import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RedditComment } from '../models';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  @Input() comments: RedditComment[];
}
