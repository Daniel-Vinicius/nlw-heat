import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=6625d69ff467ad0eeaef`;

  async function signInWithGithub(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    localStorage.setItem('@dowhile:token', token);
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/profile').then(response => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      signInWithGithub(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signInUrl,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
