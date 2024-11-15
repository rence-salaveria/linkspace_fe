import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Navbar from "@/components/Navbar.tsx";
import {FaFile, FaIdCard, FaRegClock, FaRegCopy, FaRegRectangleList} from "react-icons/fa6";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {useState} from "react";
import {User} from "@/types/user.ts";
import {useNavigate} from "react-router-dom";

type DashboardData = {
  history: number,
  todayConsultation: number,
  consultation: number,
  student: number,
  audit: number,
}

export function Dashboard() {
  const [user] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  const navigate = useNavigate();

  const {data} = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await axios.get('/dashboard-info')
      if (res) {
        return res.data.payload
      } else {
        console.error("No dashboard data")
      }
    },
  })

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar/>
      <main className="flex-1 w-full flex justify-center">
        <div className="container py-6">
          <h1 className="mb-6 mt-6 text-3xl font-bold text-white">Welcome, {user.fullName}!</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              onClick={() => navigate('/table/student')}
              className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <FaIdCard className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.student || 0}</div>
                <p className="text-xs text-muted-foreground">
                  currently encoded
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => navigate('/table/consultation')}
              className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultations
                </CardTitle>
                <FaRegCopy className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.consultation || 0}</div>
                <p className="text-xs text-muted-foreground">
                  currently recorded
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => navigate('/table/today-consultation')}
              className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Consultations
                </CardTitle>
                <FaRegClock className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.todayConsultation || 0}</div>
                <p className="text-xs text-muted-foreground">
                  this day
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => navigate('/table/consultation-history')}
              className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultation History
                </CardTitle>
                <FaFile className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.history || 0}</div>
                <p className="text-xs text-muted-foreground">
                  records available
                </p>
              </CardContent>
            </Card>

            <Card
              onClick={() => navigate('/table/audit-trail')}
              className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Audit Trail
                </CardTitle>
                <FaRegRectangleList className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.audit || 0}</div>
                <p className="text-xs text-muted-foreground">
                  operations logged
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}