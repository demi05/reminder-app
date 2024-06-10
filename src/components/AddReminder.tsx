import { Link } from "react-router-dom";
import "./Reminder.css";
import { useContextValues } from "./context/GlobalState";
import UseFetch from "./UseFetch";
import { useEffect } from "react";

const AddReminder = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    time,
    setTime,
    color,
    setColor,
    handleFormData,
    handleSubmit,
    submitUrl,
    submitOptions,
  } = useContextValues();

  const { data } = UseFetch(submitUrl, submitOptions);

  useEffect(() => {
    if (data) {
      console.log("Successfully added reminder");
    }
  }, [data]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <Link to={"/reminder"}>Cancel</Link>
          <h3>New Reminder</h3>
          <button>
            <p onClick={handleFormData}>Set Reminder</p>
          </button>
        </div>
        <div className="input-div">
          <div>
            Title(At most 12 characters)
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            Description(At most 32 characters)
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="input-div">
          <div>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            Time
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="input-div">
          Color
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddReminder;