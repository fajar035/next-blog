import axios from 'axios';

export const userApi = () => {
  const url = 'https://gorest.co.in/public/v1/users';
  return axios.get(url);
};
