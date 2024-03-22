import { NewsI, UserI, userDataI } from "@/types/types";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const truncateText = (text: string, number: number): string => {
  if (text.length < number) {
    return text
  }

  return text.substring(0, number) + "...";
}

// POSTS

export const createPost = async(title: string, text: string, banner: string, userId: string, category: string ) => {
  const res = await fetch("api/post/create", {
    method: "POST",
    body: JSON.stringify({
      title,
      text,
      banner,
      category,
      userId
    })
  })

  const data = await res.json();

  return data;
}

export const findLatestPosts = async (): Promise<NewsI[]> => {
  const res = await fetch("api/post/latest");
  const data: NewsI[] = await res.json();

  return data;
}

export const findPost = async (id: string) => {
  const res = await fetch(`api/post/${id}`);
  const data: NewsI = await res.json();

  return data;
}

export const findPosts = async () => {
  const res = await fetch("api/post");
  const data: NewsI[] = await res.json();

  return data;
}

export const findPostsByCategory = async(category: string) => {
  const res = await fetch("api/post/category/" + category);
  const data: NewsI[] = await res.json();

  return data;
}

export const findRelatedPosts = async (id: string) => {
  const res = await fetch(`api/post/${id}/related`);
  const data: NewsI[] = await res.json();

  return data;
}

export const getTopPost = async (): Promise<NewsI> => {
  const res = await fetch("api/post/top");
  const data: NewsI = await res.json();

  return data;
}

export const findUserPosts = async (id: string) => {
  const res = await fetch(`api/user/${id}/posts`);
  const data: NewsI[] = await res.json();

  return data;
}

export const likePost = async (id: string, userId: string) => {
  const res = await fetch(`api/post/${id}/like`, {
    method: "PATCH",
    headers: { "Content-Type": "application" },
    body: JSON.stringify({ userId: userId })
  })

  const data = await res.json();

  return data;
}

export const commentPost = async (comment: string, username: string, avatar: string, userId: string, postId: string) => {
  const res = await fetch(`api/post/${postId}/comment`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      comment,
      avatar,
      username
    })
  })

  const data = await res.json();

  return data;
}

export const deleteComment = async (userId: string, postId: string, idComment: string) => {
  const res = await fetch(`api/post/${postId}/comment/delete/${idComment}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId
    })
  })

  const data = await res.json();

  return data;
}

export const editPost = async(title: string, text: string, banner: string, category: string, id: string) => {
  const res = await fetch(`api/post/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      text,
      banner,
      category
    })
  })

  const data = await res.json();

  return data;
}

export const deletePost = async(id: string) => {
  const res = await fetch(`api/post/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })

  const data = await res.json();

  return data;
}

// USER

export const createNewUser = async (userData: userDataI) => {
  const res = await fetch("api/user/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...userData,
      username: generateUserName(userData.name)
    })
  });

  if (res.ok) {
    const data = await res.json();
    toast.success(data.message);

    const login = {
      email: userData.email,
      password: userData.password,
    }

    signIn("credentials", {
      ...login,
      callbackUrl: "/",
    })
  }
}

export const generateUserName = (name: string): string => {
  const nameLowerCaseWithoutSpaces = name.replace(/\s/g, "").toLowerCase();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${nameLowerCaseWithoutSpaces}${randomNumber}`;
}

export const findUser = async (id: string) => {
  const res = await fetch("api/user/" + id);
  const data: UserI = await res.json();

  return data;
}