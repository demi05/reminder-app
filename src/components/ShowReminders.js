import { useContextValues } from "./GlobalState";
import UseFetch from "./UseFetch";
import "./Reminder.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ShowReminders = () => {
  const { id } = useParams();

  const {
    data: reminders,
    loading,
    error,
  } = UseFetch(`http://localhost:8000/reminders`);

  const { title, color } = useContextValues();
  const divStyle = {
    backgroundColor: color,
  };

  const deleteReminder = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/reminders/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete reminder");
      }
      console.log(`Reminder with ID ${id} deleted successfully.`);
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

          deleteReminder(reminder.id);
        }
      });
    };

    if (reminders && reminders.length > 0) {
      const intervalId = setInterval(checkReminders, 1000); // Check every minute

      return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }
  }, [reminders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="show-reminders-div">
      <h2>Reminders</h2>
      {reminders &&
        reminders.map((reminder) => (
          <div style={divStyle} className="reminder-div" key={id}>
            {console.log(reminder)}
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
