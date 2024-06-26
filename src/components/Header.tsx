import { useContext } from "react";
import { useContextValues } from "./context/GlobalState";
import "./Reminder.css";

const Header = () => {
  const { name } = useContext(useContextValues);
  return (
    <header>
      <h1>Hello, {name}!</h1>
      <p>Welcome back</p>
    </header>
  );
};

export default Header;
