import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const addPost = createAsyncThunk(
  "dashboard/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const { userId, comments, likes, image, location, coordinates, text } =
        data;
      const result = await addPostToDB({
        userId,
        comments,
        likes,
        image,
        location,
        coordinates,
        text,
      });
      return result;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const getPosts = createAsyncThunk(
  "dashboard/getPosts",
  async (setPosts, { rejectWithValue }) => {
    try {
      const result = await getAllPostsFromDB({ setPosts: setPosts });
      return result;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const getUsersPosts = createAsyncThunk(
  "dashboard/getUsersPosts",
  async (data, { rejectWithValue }) => {
    const { userId, setUsersPosts } = data;
    try {
      const result = await getUsersPostsFromDB({
        userId: userId,
        setUsersPosts: setUsersPosts,
      });
      return result;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const addComments = createAsyncThunk(
  "dashboard/addComment",
  async (data, { rejectWithValue }) => {
    const { postId, commentData } = data;
    try {
      await addCommentToPostInDB({ postId, commentData: commentData });
      return;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "dashboard/getComments",
  async (data, { rejectWithValue }) => {
    const { postId, setComments } = data;
    try {
      await getAllCommentsToPostFromDB({
        postId: postId,
        setComments: setComments,
      });
      return;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const addLike = createAsyncThunk(
  "dashboard/addLike",
  async (data, { rejectWithValue }) => {
    const { postId } = data;
    try {
      await addLikeToPostInDB({ postId: postId });
      return;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);

export const removeLike = createAsyncThunk(
  "dashboard/removeLike",
  async (data, { rejectWithValue }) => {
    const { postId } = data;
    try {
      await removeLikeToPostInDB({ postId: postId });
      return;
    } catch (error) {
      console.dir({ error });
      Alert.alert(`${error.code}`);
      return rejectWithValue(error);
    }
  }
);