import { ReactNode, createContext, useContext, useState } from "react";
import { History } from "history";
import { api } from "../../Services/api";
interface Token {
  token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  userData: object;
  setError: (boolean: boolean) => boolean;
  history: History;
}

interface AuthProviderData {
  token: { token: string };
  setAuth: any;
  signIn: (props: SignInProps) => void;
}
const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Token>(() => {
    const data = localStorage.getItem("token");
    if (data) {
      return JSON.parse(data);
    }
    return "";
  });

  const signIn = ({ userData, setError, history }: SignInProps) => {
    api
      .post("/sessions/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((error) => setError(true));
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
