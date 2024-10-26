import Navbar from "@/components/Navbar.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import { Consultation } from "@/types/consultation.ts";
import { useState } from "react";
import { User } from "@/types/user.ts";
import { ReusableTableComponent } from "@/components/reusable-table.tsx";

const ConsultationsTable = () => {
  const [user] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  const { data, isFetching } = useQuery<Consultation[]>({
    queryKey: ['consultation', user],
    queryFn: async () => {
      const res = await axios.get(`/consultation/${user.id}`);
      if (res) {
        console.log(res.data.payload);
        return res.data.payload;
      } else {
        console.error("No consultation data");
      }
    },
  });

  const columns = [
    { header: "Student ID", accessor: "studentId" },
    { header: "Student Name", accessor: "studentName" },
    { header: "Date", accessor: "scheduleDate", render: (date: any) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    { header: "Concern", accessor: "concern", render: (concern: string | null) => concern || "No concern yet" },
    { header: "Counselor Comment", accessor: "counselorComment", render: (comment: string | null) => comment || "No counselor comment yet" },
    {
      header: "Status", accessor: "status", render: (status: string) => (
        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${status === 'LookUp-001' ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
          <span aria-hidden className={`absolute inset-0 ${status === 'LookUp-001' ? 'bg-gray-500' : 'bg-primary'} opacity-50 rounded-full`}></span>
          <span className="relative">{status === 'LookUp-001' ? 'Draft' : 'Scheduled'}</span>
        </span>
      )
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="container py-6">
        <Navbar />
        <main className="flex-1 w-full flex justify-center">
          {isFetching ? <div>Loading...</div> : (
            <ReusableTableComponent data={data!} columns={columns} tableTitle="Consultations" />
          )}
        </main>
      </div>
    </div>
  );
};

export default ConsultationsTable;