import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
client.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const researchApi = {
  createResearch: async (data: any) => {
    const response = await client.post('/research', data);
    return response.data;
  },
  getResearch: async (researchId: string) => {
    const response = await client.get(`/research/${researchId}`);
    return response.data;
  },
  listResearch: async (page = 1, limit = 10) => {
    const response = await client.get('/research/list', {
      params: { page, limit },
    });
    return response.data;
  },
};

export const proposalApi = {
  createProposal: async (data: any) => {
    const response = await client.post('/proposal', data);
    return response.data;
  },
  getProposal: async (proposalId: string) => {
    const response = await client.get(`/proposal/${proposalId}`);
    return response.data;
  },
  updateProposal: async (proposalId: string, data: any) => {
    const response = await client.put(`/proposal/${proposalId}`, data);
    return response.data;
  },
  deleteProposal: async (proposalId: string) => {
    const response = await client.delete(`/proposal/${proposalId}`);
    return response.data;
  },
};

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await client.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await client.post('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },
};

export default client;
