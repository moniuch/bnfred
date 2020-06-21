import { map } from 'rxjs/operators';

/**
 * Unwraps posts and comments from full post response (assumes a 2-item array JSON)
 */
export function unwrapPostAndCommentsFromResponse() {
  return map(([postResponse, commentsResponse]) => {
    const post = postResponse.data.children[0].data;
    const comments = commentsResponse.data.children.map(({ data }) => data);

    return { post, comments };
  });
}

/**
 * Unwraps posts from post Listings
 */
export function unwrapPostsFromResponse() {
  return map(({ data }) => (data.children || []).map(post => post.data));
}
