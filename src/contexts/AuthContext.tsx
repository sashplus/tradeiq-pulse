import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
  tradingExperience?: 'beginner' | 'intermediate' | 'advanced';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  tradingExperience?: 'beginner' | 'intermediate' | 'advanced';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions
const mockUsers: { email: string; password: string; fullName: string; id: string; tradingExperience?: string }[] = [
  { id: '1', email: 'demo@tradeiq.com', password: 'password123', fullName: 'Demo Trader' }
];

async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | { error: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    return {
      user: { id: user.id, email: user.email, fullName: user.fullName, tradingExperience: user.tradingExperience as User['tradingExperience'] },
      token: `mock-jwt-token-${Date.now()}`
    };
  }
  return { error: 'Invalid email or password' };
}

async function registerUser(data: RegisterData): Promise<{ user: User; token: string } | { error: string }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if email exists
  if (mockUsers.some(u => u.email === data.email)) {
    return { error: 'Email already registered' };
  }
  
  const newUser = {
    id: String(mockUsers.length + 1),
    email: data.email,
    password: data.password,
    fullName: data.fullName,
    tradingExperience: data.tradingExperience
  };
  mockUsers.push(newUser);
  
  return {
    user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, tradingExperience: newUser.tradingExperience as User['tradingExperience'] },
    token: `mock-jwt-token-${Date.now()}`
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token on mount
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<{ success: boolean; error?: string }> => {
    const result = await loginUser(email, password);
    
    if ('error' in result) {
      return { success: false, error: result.error };
    }
    
    setUser(result.user);
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('auth_user', JSON.stringify(result.user));
    
    if (!remember) {
      // If not remember, set session-only storage would be used in real app
    }
    
    return { success: true };
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    const result = await registerUser(data);
    
    if ('error' in result) {
      return { success: false, error: result.error };
    }
    
    setUser(result.user);
    localStorage.setItem('auth_token', result.token);
    localStorage.setItem('auth_user', JSON.stringify(result.user));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, would send reset email
    const userExists = mockUsers.some(u => u.email === email);
    if (!userExists) {
      // Still return success to not reveal if email exists
    }
    
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
