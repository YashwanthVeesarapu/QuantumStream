import "./styles.scss";
import { useAuth } from "../../AuthProvider";

type Auth = {
  logout: () => void;
  user: string;
};

const Header = () => {
  const auth = useAuth() as Auth;

  return (
    <header>
      <div className="sec-1">
        <h1>Quantum Stream</h1>
      </div>
      <div className="sec-2">
        {auth.user && <button onClick={() => auth.logout()}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
