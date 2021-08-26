import {
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { History } from "history";
import { api } from "../../Services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  data: object;
  setError: Dispatch<SetStateAction<boolean>>;
  history: History;
}

interface AuthProviderData {
  token: string;
  setAuth: Dispatch<SetStateAction<string>>;
  signIn: (props: SignInProps) => void;
}
const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<string>(() => {
    const data = localStorage.getItem("token");
    if (data) {
      return JSON.parse(data);
    }
    return "";
  });

  const signIn = ({ data, setError, history }: SignInProps) => {
    api
      .post("/login/", data)
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
