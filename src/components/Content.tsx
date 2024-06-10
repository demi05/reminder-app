import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Reminder.css";
import AddReminder from "./AddReminder";

const Content = () => {
  return (
    <div className="content-div">
      <h2>Add a Reminder</h2>
      {/* <Link to={"/addreminder"}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        <p>Add Reminder</p>
      </Link> */}
      <AddReminder />
    </div>
  );
};

export default Content;
