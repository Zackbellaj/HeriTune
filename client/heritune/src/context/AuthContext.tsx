
'use client';
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get<User>('/users/me')
        .then(res => setUser(res.data))
        .catch(() => {
            localStorage.removeItem('token');
            setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Dans src/context/AuthContext.tsx

const login = async (email: string, pass: string) => {
  try {
      const res = await api.post('/auth/login', { email, password: pass });
      localStorage.setItem('token', res.data.token);
      
      const userRes = await api.get<User>('/users/me');
      setUser(userRes.data);
      router.push('/');
  } catch (error) {
      console.error("Login failed", error);
      throw error; // <--- IMPORTANT : On renvoie l'erreur pour que la Page l'affiche
  }
};

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};