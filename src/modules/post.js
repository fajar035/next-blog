import axios from 'axios';

export const getAllPostApi = () => {
  const url = 'https://gorest.co.in/public/v1/posts';
  return axios.get(url);
};

export const getPostIdApi = idPost => {
  const url = `https://gorest.co.in/public/v1/posts/${idPost}`;
  return axios.get(url);
};
