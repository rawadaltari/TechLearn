import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/Users/login', {
        username: email,
        password: password,
      });

      const data = response.data;
      console.log('Login API response:', data);

      const personType = (data.personType || '').toLowerCase();
      console.log('personType from API:', personType);

      let role: 'teacher' | 'student';
      if (personType === 'teacher') {
        role = 'teacher';
      } else if (personType === 'student') {
        role = 'student';
      } else {
        console.warn(`Unexpected personType from API:`, data.personType);
        setIsLoading(false);
        return false;
      }

      const loggedInUser: User = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role,
        createdAt: new Date(),
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/Users/register', userData);
      const data = response.data;

      const role = (data.personType || userData.role).toLowerCase();

      const newUser: User = {
        id: data.id || Date.now().toString(),
        firstName: data.firstName || userData.firstName,
        lastName: data.lastName || userData.lastName,
        email: data.email || userData.email,
        role: role === 'teacher' || role === 'student' ? role : 'student',
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
