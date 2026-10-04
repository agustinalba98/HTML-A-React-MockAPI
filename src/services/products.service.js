import axios from "axios";

export const BASE_URL = "https://6ab063dbee9c55c910bfa5c7.mockapi.io";

export const getProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (data) => {
  const payload = { ...data, createdAt: new Date().toISOString() };
  const res = await axios.post(`${BASE_URL}/products`, payload);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`);
  return res.data;
};
