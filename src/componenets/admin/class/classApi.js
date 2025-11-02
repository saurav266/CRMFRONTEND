// src/api/classApi.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/classes"; // adjust if needed

export const getAllClasses = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createClass = async (classData) => {
  const res = await axios.post(BASE_URL, classData);
  return res.data;
};

export const updateClass = async (id, classData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, classData);
  return res.data;
};

export const deleteClass = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};