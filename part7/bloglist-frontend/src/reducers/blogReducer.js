import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    blogsSet: (_state, action) => {
      return action.payload;
    },
    blogAppended: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(blogsSet(sortedBlogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog);
    dispatch(blogAppended(createdBlog));
    return createdBlog;
  };
};

export const { blogsSet, blogAppended } = blogSlice.actions;

export default blogSlice.reducer;
