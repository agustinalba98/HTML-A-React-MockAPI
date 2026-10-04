import axios from "axios";
import { BASE_URL } from "./products.service";

export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/users`, data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`);
  return res.data;
};
