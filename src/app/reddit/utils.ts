import { map } from 'rxjs/operators';

export function unwrapPostAndComments() {
	return map(([postResponse, commentsResponse]) => {
		const post = postResponse.data.children[0].data;
		const comments = commentsResponse.data.children.map(({ data }) => data);

		return { post, comments };
	});
}
