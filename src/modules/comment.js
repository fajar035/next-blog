import axios from 'axios';

export const commentsApi = () => {
  const url = 'https://gorest.co.in/public/v1/comments';
  return axios.get(url);
};
