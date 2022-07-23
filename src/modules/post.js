import axios from 'axios';

export const postsApi = () => {
  const url = 'https://gorest.co.in/public/v1/posts';
  return axios.get(url);
};
