import { Link } from "react-router-dom";
import "./Onboarding.css";
import { useContextValues } from "./context/GlobalState";
import { useContext } from "react";


const Onboarding = () => {
  const { name, setName } = useContext(useContextValues);

  return (
    <div className="onboarding-div">
      <h1>Hello!</h1>
      <p>Please enter your name</p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Link to={"./reminder"}>Go</Link>
    </div>
  );
};

export default Onboarding;
