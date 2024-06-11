import { useContextValues } from "./context/GlobalState";
import "./Reminder.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";

const ShowReminders = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:8000/reminders"

  const { title, color, clearForm, reminders, setReminders } = useContext(useContextValues);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
         await axios.get(url). then(res => {
          setReminders(res.data);
          console.log("Fetched reminders:", reminders);
        });
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, [url, setReminders]);

  const divStyle = {
    backgroundColor: color,
    border: "1px solid red"
  };

  const deleteReminder = async (reminderId: number) => {
    try {
      await axios.delete(`http://localhost:8000/reminders/${reminderId}`);
      setReminders(reminders.filter(reminder => reminder.id !== reminderId));
      // navigate("/reminder");
      clearForm();
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  useEffect(() => {
    const checkReminders = () => {
      const currentTime = new Date();
      reminders.forEach((reminder) => {
        const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
        if (
          currentTime.getFullYear() === reminderTime.getFullYear() &&
          currentTime.getMonth() === reminderTime.getMonth() &&
          currentTime.getDate() === reminderTime.getDate() &&
          currentTime.getHours() === reminderTime.getHours() &&
          currentTime.getMinutes() === reminderTime.getMinutes()
        ) {
          alert(`Reminder: ${title}`);
          const audio = new Audio("../assets/nice_alert_tone.mp3");
          audio.play();

          // deleteReminder(reminder.id);
        }
      });
    };

    if (reminders && reminders.length > 0) {
      const intervalId = setInterval(checkReminders, 1000); // Check every second

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }
  }, [reminders]);


  return (
    <div className="show-reminders-div">
      <h2>Reminders</h2>
      {reminders &&
        reminders.map((reminder) => (
          <div style={divStyle} className="reminder-div" key={reminder.id}>
            <h2>Title: {reminder.title}</h2>
            <p>Description: {reminder.description}</p>
            <p>Date: {reminder.date}</p>
            <p>Time: {reminder.time}</p>
            <p onClick={() => deleteReminder(reminder.id)}>Remove</p>
          </div>
        ))}
    </div>
  );
};

export default ShowReminders;
