export default function createGifResponse(name: string = 'elephant', width: string = '486', height: string = '200') {
  const _id = Math.random();
  return JSON.stringify({
    ok: true,
    data: [
      {
        type: 'gif',
        id: _id,
        url: `https://giphy.com/gifs/${name}-${_id}`,
        embed_url: `https://giphy.com/embed/${_id}`,
        username: '',
        source: 'https://www.reddit.com/r/gif/comments/4cf4r6/and_they_say_that_elephants_cant_jump/',
        title: `${name} GIF`,
        rating: 'g',
        content_url: '',
        images: {
          fixed_width: {
            width,
            height,
          },
        },
      },
    ],
    pagination: { total_count: 400, count: 5, offset: 0 },
    meta: { status: 200, msg: 'OK', response_id: 'xdqo6lawnvxsmpjxjwfc971a2taz3rq9jrpyjuxv' },
  });
}
