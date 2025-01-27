import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import ViewTicket from "./Components/ViewTicket";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="viewTicket" element={<ViewTicket />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />} />

      </Routes>
    </Router>
  );
}

export default App;
