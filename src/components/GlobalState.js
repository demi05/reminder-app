import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();
export const useContextValues = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("#000000");
  const navigate = useNavigate();

  const [submitUrl, setSubmitUrl] = useState(null);
  const [submitOptions, setSubmitOptions] = useState(null);

  const currentDate = new Date();
  const inputDateTime = new Date(`${date}T${time}`);

  const handleFormData = () => {
    if (!title || !description || !date || !time || !color) {
      alert("No field must be empty");
    } else if (inputDateTime < currentDate) {
      alert("Date must be in the future");
    } else if (title.length > 12) {
      alert("Title must be less than or equal to 12 characters");
    } else if (description.length > 12) {
      alert("Description must be less than or equal to 12 characters");
    } else {
      navigate("/showreminders");
    }

    const formData = { title, description, date, time, color };

    setSubmitUrl("http://localhost:8000/reminders");
    setSubmitOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormData();
  };

  return (
    <GlobalContext.Provider
      value={{
        name,
        setName,
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
        setSubmitUrl,
        submitOptions,
        setSubmitOptions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
