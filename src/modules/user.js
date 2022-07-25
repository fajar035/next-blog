import axios from 'axios';

export const getAllUserApi = (token, page) => {
  const url = `https://gorest.co.in/public/v1/users/?page=${page}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(url, config);
};

export const getUserIdApi = (idUser, token) => {
  const url = `https://gorest.co.in/public/v1/users/${idUser}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(url, config);
};

export const addUserApi = (token, body) => {
  const url = 'https://gorest.co.in/public/v1/users';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.post(url, body, config);
};

export const updateUserApi = (token, id, body) => {
  const url = `https://gorest.co.in/public/v1/users/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.patch(url, body, config);
};

export const deleteUserApi = (token, id) => {
  const url = `https://gorest.co.in/public/v1/users/${id}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.delete(url, config);
};
