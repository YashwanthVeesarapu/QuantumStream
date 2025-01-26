import { createContext, useContext, useEffect, useState } from "react";
import { apiInstance } from "./lib/config";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [loading, setLoading] = useState(true);

  const loginAction = async (data: any) => {
    setLoading(true);
    apiInstance
      .post("/auth/login", data)
      .then((response) => {
        const res = response.data;
        if (res.token) {
          let newToken = res.token;
          let payload = JSON.parse(atob(newToken.split(".")[1]));

          setUser(payload.user);
          setToken(newToken);

          localStorage.setItem("user", payload.user);
          localStorage.setItem("site", newToken);
          apiInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert(err.response.data.message || "Login failed");
      });
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
