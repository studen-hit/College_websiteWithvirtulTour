import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyPortal from "./pages/FacultyPortal";

type View = "home" | "login" | "portal";

export default function App() {
  const [view, setView] = useState<View>("home");

  if (view === "login") {
    return (
      <FacultyLogin
        onLogin={() => setView("portal")}
        onBack={() => setView("home")}
      />
    );
  }

  if (view === "portal") {
    return (
      <FacultyPortal
        onLogout={() => setView("home")}
      />
    );
  }

  return (
    <div>
      <Navbar onFacultyLogin={() => setView("login")} />
      <HomePage onFacultyLogin={() => setView("login")} />
    </div>
  );
}
