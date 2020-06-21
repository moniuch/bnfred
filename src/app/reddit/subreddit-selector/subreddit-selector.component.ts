import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subreddit-selector',
  templateUrl: './subreddit-selector.component.html',
  styleUrls: ['./subreddit-selector.component.scss'],
})
export class SubredditSelectorComponent implements OnInit {
  @Input() subreddits: string[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      subreddit: null,
    });
  }
}
