import "./App.scss";
import Header from "./components/Header";
import { useAuth } from "./AuthProvider";
import Home from "./components/Home";
import Login from "./components/Login";

type Auth = {
  user: string;
  loading: boolean;
};
function App() {
  const auth = useAuth() as Auth;

  return (
    <div className="app">
      <Header />
      {!auth.user && <Login />}
      {auth.user && !auth.loading && <Home />}
    </div>
  );
}

export default App;
