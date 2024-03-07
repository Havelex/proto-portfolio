import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCommentsFromPost = async (post: { title: string; section: string }) => {
  return await prisma.comment.findMany({
    where: { postTitle: post.title, sectionTitle: post.section }
  });
};

export const createComment = async (postTitle: string, sectionTitle: string, content: string) => {
  return await prisma.comment.create({
    data: {
      postTitle: postTitle,
      sectionTitle: sectionTitle,
      content: content
    }
  });
};

export const updateComment = async (id: string, content: string) => {
  return await prisma.comment.update({
    where: { id: id },
    data: { content: content }
  });
};

export const deleteComment = async (id: string) => {
  return await prisma.comment.delete({ where: { id: id } });
};
