import { PrismaClient, type Comment, type Author } from '@prisma/client';

const prisma = new PrismaClient();

export const getCommentsFromPost = async (post: {
	title: string;
	section: string;
}): Promise<Comment[]> => {
	return await prisma.comment.findMany({
		where: { postTitle: post.title, sectionTitle: post.section },
		orderBy: [{ updatedAt: 'desc' }]
	});
};

export const createComment = async (
	postTitle: string,
	sectionTitle: string,
	content: string,
	authorId: string
): Promise<Comment> => {
	return await prisma.comment.create({
		data: {
			postTitle: postTitle,
			sectionTitle: sectionTitle,
			content: content,
			authorId: authorId
		}
	});
};

export const updateComment = async (id: string, content: string): Promise<Comment> => {
	return await prisma.comment.update({
		where: { id: id },
		data: { content: content }
	});
};

export const deleteComment = async (id: string): Promise<Comment> => {
	return await prisma.comment.delete({ where: { id: id } });
};

export const getAuthorById = async (id: string): Promise<Author | null> => {
	return id ? await prisma.author.findUnique({ where: { id: id } }) : null;
};
