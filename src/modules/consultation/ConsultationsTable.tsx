import Navbar from "@/components/Navbar.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {Consultation} from "@/types/consultation.ts";
import {useState} from "react";
import {User} from "@/types/user.ts";
import {ReusableTableComponent} from "@/components/reusable-table.tsx";
import {createColumnHelper} from "@tanstack/react-table";
import {FaRegPenToSquare} from "react-icons/fa6";

const ConsultationsTable = () => {
  const [user] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  const columnHelper = createColumnHelper<Consultation>();

  const {data, isFetching} = useQuery<Consultation[]>({
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
    columnHelper.accessor("student.lastName", {
      header: () => "Name",
      cell: (row) => {
        const student = row.row.original.student;
        return (
          <div className="text-center">
            {student.lastName}, {student.firstName}
          </div>
        );
      }
    }),
    columnHelper.accessor("student.birthdate", {
      header: () => "Age",
      cell: (row) => {
        const birthdate = new Date(row.getValue());
        const age = new Date().getFullYear() - birthdate.getFullYear();
        return age;
      }
    }),
    columnHelper.accessor("student.course", {
      header: () => "Course and Year Level",
      cell: (row) => {
        const student = row.row.original.student;
        return `${student.course} - Year ${student.year}`;
      }
    }),
    columnHelper.accessor("scheduleDate", {
      header: () => "Schedule Date and Time",
      cell: (row) => new Date(row.getValue()).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (row) => {
        const value = row.getValue();
        return (
          <span
            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${value === 'LookUp-001' ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
            <span aria-hidden
                  className={`absolute inset-0 ${value === 'LookUp-001' ? 'bg-gray-500' : 'bg-primary'} opacity-50 rounded-full`}></span>
            <span className="relative">{value === 'LookUp-001' ? 'Draft' : 'Scheduled'}</span>
          </span>
        );
      }
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: (row) => (
        <div className="text-center">
          <button
            className="px-2 py-2 bg-primary text-white rounded text-center"
            onClick={() => handleActionClick(row.row.original)}
          >
            <FaRegPenToSquare/>
          </button>
        </div>
      )
    })
  ];

  const handleActionClick = (consultation: Consultation) => {
    // Define your action here
    console.log('Action clicked for consultation:', consultation);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="container py-6">
        <Navbar/>
        <main className="flex-1 w-full flex justify-center">
          {isFetching ? <div>Loading...</div> : (
            // @ts-ignore
            <ReusableTableComponent data={data ? data : []} columns={columns} tableTitle="Consultations"/>
          )}
        </main>
      </div>
    </div>
  );
};

export default ConsultationsTable;