import { Link } from "react-router-dom";
import "./Reminder.css";
import { useContextValues } from "./context/GlobalState";
import axios from "axios";
// import UseFetch from "./UseFetch";
import { ChangeEvent, useEffect, useState } from "react";
import { useContext } from "react";

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
    reminders, setReminders
    // handleSubmit,
    // submitUrl,
    // submitOptions,
  } = useContext(useContextValues);
  const url = "http://localhost:8000/reminders";
  function handleChange(e: ChangeEvent<HTMLInputElement>){
    setTitle(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(title);

      handleFormData();

      try {
        const res = await axios.post(url, {
          title,
          description,
          date,
          time,
          color,
        });
        setReminders([res.data]);
        console.log(title)
      } catch(error) {
        console.log("error", error);
      }
    };
  
  return (
    <div className="form">
      <form onSubmit={handleSubmit}  id="reminder-form">
        <div className="form-header">
          <Link to={"/reminder"}>Cancel</Link>
          <h3>New Reminder</h3>
          <button type="submit" >Set Reminder</button>
          
        </div>
        <div className="input-div">
          <div>
            Title(At most 12 characters)
            <input
              type="text"
              value={title}
              onChange={/* (e) => setTitle(e.target.value) */ e=>handleChange(e)}
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
