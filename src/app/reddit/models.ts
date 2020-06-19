export interface RedditResponse<T> {
  kind: string;
  data: T;
}

export interface RedditSubredditPosts {
  after: string;
  before: string;
  children: RedditSubredditPostResponse[];
  modhash: string;
  dist: number;
}

export interface RedditSubredditPostsResponse extends RedditResponse<RedditSubredditPosts> {

}

export interface RedditSubredditPostWithComments {
  post: RedditSubredditPost;
  comments: RedditComment[];
}

export interface RedditSubredditPost {
  thumbnail: string;
  created: string; // (as readable date)
  num_comments: string;
  author: string;
  score: string;
  permalink: string; // (as a link)
  title: string;
  selftext: string;
  name: string;
  id: string;
}

export interface RedditSubredditPostResponse extends RedditResponse<RedditSubredditPost> {

}

export interface RedditComment {

}
