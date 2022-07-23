import axios from 'axios';

export const getCommentsIdApi = idComment => {
  const url = `https://gorest.co.in/public/v2/posts/${idComment}/comments`;
  return axios.get(url);
};

export const getAllCommentsApi = () => {
  const url = `https://gorest.co.in/public/v1/comments`;
  return axios.get(url);
};
