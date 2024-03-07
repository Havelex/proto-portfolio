import { deleteComment, getCommentsFromPost } from '$lib/db/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const title = url.searchParams.get('title') ?? '';
  const section = url.searchParams.get('section') ?? '';
  const comments = await getCommentsFromPost({ title, section });
  return json(comments);
};

export const DELETE: RequestHandler = async ({ url }) => {
  const id = url.searchParams.get('id') ?? '';
  const comment = json(await deleteComment(id));
  return json(comment);
};
