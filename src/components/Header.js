import { useContextValues } from "./GlobalState";
import "./Reminder.css";

const Header = () => {
  const { name } = useContextValues();
  return (
    <header>
      <h1>Hello, {name}!</h1>
      <p>Welcome back</p>
    </header>
  );
};

export default Header;
