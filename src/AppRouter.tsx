import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import LoginPage from "@/modules/login/LoginPage.tsx";
import HomePage from "@/modules/home/HomePage.tsx";
import ConsultationsTable from "@/modules/consultation/ConsultationsTable.tsx";
import StudentsTable from "@/modules/students/StudentsTable.tsx";
import TodayConsultationsTable from "@/modules/consultation/TodayConsultationsTable.tsx";
import ConsultationHistoryTable from "@/modules/consultation/ConsultationHistoryTable.tsx";
import AuditTrailTable from "@/modules/audit/AuditTrailTable.tsx";
import AddStudent from "@/modules/students/AddStudent.tsx";
import StudentPage from "@/modules/students/StudentPage.tsx";

function AppRouter() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />

        <Route path="/table" element={<Outlet />}>
          <Route path="/table/student" element={<StudentsTable />} />
          <Route path="/table/consultation" element={<ConsultationsTable type="pending"/>} />
          <Route path="/table/today-consultation" element={<ConsultationsTable type="today"/>} />
          <Route path="/table/consultation-history" element={<ConsultationsTable type="done"/>} />
          <Route path="/table/audit-trail" element={<AuditTrailTable />} />
        </Route>

        <Route path="/student/:id" element={<StudentPage/>}/>

        <Route path="/add" element={<Outlet />}>
          <Route path="/add/student" element={<AddStudent />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;