import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const quickSearch = async (username) => {
  const response = await API.get(
    `/search/quick/${encodeURIComponent(username)}`
  );

  return response.data;
};

export const fullSearch = async (username) => {
  const response = await API.get(
    `/search/${encodeURIComponent(username)}`
  );

  return response.data;
};

export const emailLookup = async (email) => {
  const response = await API.get(
    `/email/${encodeURIComponent(email)}`
  );

  return response.data;
};

export const domainLookup = async (domain) => {
  const response = await API.get(
    `/domain/${encodeURIComponent(domain)}`
  );

  return response.data;
};
export const ipLookup = async (ip) => {
  const response = await API.get(
    `/ip/${encodeURIComponent(ip)}`
  );

  return response.data;
};