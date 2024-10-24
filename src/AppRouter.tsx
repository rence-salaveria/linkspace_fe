import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/modules/login/LoginPage.tsx";
import HomePage from "@/modules/home/HomePage.tsx";

function AppRouter() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;