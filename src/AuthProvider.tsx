import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "./lib/config";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [loading, setLoading] = useState(true);

  const loginAction = async (data: any) => {
    setLoading(true);
    try {
      const response = await apiInstance.post("/auth/login", data);
      const res = await response.data;
      if (res.user && res.token) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem("user", res.user);
        localStorage.setItem("site", res.token);
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.token}`;
        setLoading(false);
        return;
      }
      // throw new Error(res.message);
    } catch (err) {
      setLoading(false);
      alert("Login Failed");
    }
  };

  const logout = () => {
    setUser("");
    setToken("");
    apiInstance.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("user");
    localStorage.removeItem("site");
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("site");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      // Check if token is in less than 24 hours
      if (payload.exp >= Date.now() / 1000 - 86400) {
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        setLoading(false);
        // Token is not expired
        return;
      }
      logout();
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">Authenticating...</div>
      ) : (
        <AuthContext.Provider
          value={{ user, token, logout, loginAction, loading }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
