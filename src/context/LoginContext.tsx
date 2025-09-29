import { createContext } from "react";

interface Role {
  id: number;
  name: string;
  status: boolean;
}

interface User {
  uid: string;
  name: string;
  email: string;
  roles?: Role[];
}

interface LoginContextType {
  isLoggedIn: boolean;
  usuario: User | null;
  role: Role | null;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  usuario: null,
  role: null,
  logout: () => {},
});
