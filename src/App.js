import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Reminder from "./components/Reminder";
// import AddReminder from "./components/AddReminder";
import { GlobalProvider } from "./components/GlobalState";
import ShowReminders from "./components/ShowReminders";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/reminder" element={<Reminder />} />
            {/* <Route path="/addreminder" element={<AddReminder />} /> */}
            <Route path="/showreminders" element={<ShowReminders />} />
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
