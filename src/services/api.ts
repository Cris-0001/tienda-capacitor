// src/services/api.ts
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

const API_BASE = 'https://fakestoreapi.com'; // puedes cambiarla por otra API
const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

// interceptor que añade token Bearer si existe
api.interceptors.request.use(async (config) => {
  try {
    const { value } = await Preferences.get({ key: 'token' });
    if (value && config.headers) {
      config.headers.Authorization = `Bearer ${value}`;
    }
  } catch (e) { /* ignore */ }
  return config;
});

export default api;
