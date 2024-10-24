import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Navbar from "@/components/Navbar.tsx";
import {FaFile, FaIdCard, FaRegClock, FaRegCopy, FaRegRectangleList} from "react-icons/fa6";

export function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar/>
      <main className="flex-1 w-full flex justify-center">
        <div className="container py-6">
          <h1 className="mb-6 mt-6 text-3xl font-bold text-white">Welcome, Clarence!</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <FaIdCard className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  currently encoded
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultations
                </CardTitle>
                <FaRegCopy className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">
                  currently recorded
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Consultations
                </CardTitle>
                <FaRegClock className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  this day
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Consultation History
                </CardTitle>
                <FaFile className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
                <p className="text-xs text-muted-foreground">
                  records available
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Audit Trail
                </CardTitle>
                <FaRegRectangleList className="text-muted-foreground"/>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,456</div>
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