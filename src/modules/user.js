import axios from 'axios';

export const getAllUserApi = () => {
  const url = 'https://gorest.co.in/public/v1/users';
  return axios.get(url);
};

export const getUserIdApi = idUser => {
  const url = `https://gorest.co.in/public/v1/users/${idUser}`;
  return axios.get(url);
};
