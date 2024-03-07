import "./styles.scss";
import { useAuth } from "../../AuthProvider";
import Button from "../Button";

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
        {auth.user && <Button onClick={() => auth.logout()}>Logout</Button>}
      </div>
    </header>
  );
};

export default Header;
