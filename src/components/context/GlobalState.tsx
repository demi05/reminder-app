import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type SubmitOptionsType = {
  method: string,
    headers: {
      "Content-Type": string,
    },
    body: string,
}

type GlobalContextType = {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>;
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>;
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>;
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setSubmitUrl: React.Dispatch<React.SetStateAction<string | null>>
  setSubmitOptions: React.Dispatch<React.SetStateAction<SubmitOptionsType | null>>
  handleFormData: () => void
  handleSubmit: () => void
  submitUrl: string | null
  submitOptions: SubmitOptionsType | null
  clearForm: () => void
}

type GlobalContextProviderProps = {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalContextProviderProps) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:8000/reminders"

  const [submitUrl, setSubmitUrl] = useState<string | null>(null);
  const [submitOptions, setSubmitOptions] = useState<SubmitOptionsType | null>(null);

  const currentDate = new Date();
  const inputDateTime = new Date(`${date}T${time}`);

  const handleFormData: () => void = () => {
    if (!title || !description || !date || !time || !color) {
      alert("No field must be empty");
    } else if (inputDateTime < currentDate) {
      alert("Date must be in the future");
    } else if (title.length > 12) {
      alert("Title must be less than or equal to 12 characters");
    } else if (description.length > 32) {
      alert("Description must be less than or equal to 32 characters");
    } else {
      navigate("/showreminders");
    }

    const formData = { title, description, date, time, color };

    setSubmitUrl(url);
    setSubmitOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  const handleSubmit: () => void = () => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormData();
    console.log(e)
  };

  const clearForm: () => void = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setColor("");
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
        clearForm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const GlobalContext = createContext({} as GlobalContextType);
export const useContextValues = () => useContext(GlobalContext);