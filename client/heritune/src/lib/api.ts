import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['x-auth-token'] = token;
    }
  }
  return config;
});

export default api;

// Petit utilitaire pour corriger les URLs d'images/audio venant de Windows/Multer
export const getAssetUrl = (path: string | undefined) => {
  if (!path) return '';
  const cleanPath = path.replace(/\\/g, '/'); // Remplace les backslashes Windows
  return `${API_URL}/${cleanPath}`;
};