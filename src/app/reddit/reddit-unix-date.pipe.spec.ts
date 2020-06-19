import { RedditUnixDatePipe } from './reddit-unix-date.pipe';

describe('RedditUnixDatePipe', () => {
  it('create an instance', () => {
    const pipe = new RedditUnixDatePipe('en-US');
    expect(pipe).toBeTruthy();
  });

  it('correctly transforms timestamp into date w/ implicit format', () => {
    const pipe = new RedditUnixDatePipe('en-US');
    expect(pipe.transform(1592606897)).toBe('2020/06/20 00:48');
  });

  it('correctly transforms timestamp into date w/ explicit format', () => {
    const pipe = new RedditUnixDatePipe('en-US');
    expect(pipe.transform(1592606897, 'yMMddHHmm')).toBe('202006200048');
  });
});
