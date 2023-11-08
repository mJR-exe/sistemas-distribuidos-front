import { createContext, useContext, useState } from "react";

import service from "../../services/service";

export type TypeAuthContext = {
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  user: object | null;
  loading: boolean;
  error: string;
};

export const Context = createContext<TypeAuthContext>({} as TypeAuthContext);

export function AuthContext({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<object | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(email: string, password: string) {
    setLoading(true);

    const json = {
      email,
      password,
    };

    service
      .login(json)
      .then((response) => {
        setLoading(false);
        setUser(response.data);
        console.log(response.data);
        window.history.replaceState(null, "", "/usuarios");
        window.location.reload();
      })
      .catch((errorResponse) => {
        setLoading(false);
        setError(errorResponse.response.data);
        console.log(errorResponse.response.data);
      });
  }

  function handleLogout() {
    window.history.replaceState(null, "", "/");
    window.location.reload();
    setUser(null);
  }

  return <Context.Provider value={{ handleLogin, user, handleLogout, loading, error }}>{children}</Context.Provider>;
}

export function useAuth() {
  return useContext(Context);
}
