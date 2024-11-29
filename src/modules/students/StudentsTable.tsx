import Navbar from "@/components/Navbar.tsx";
import {useEffect, useState} from "react";
import {User} from "@/types/user.ts";
import {createColumnHelper} from "@tanstack/react-table";
import {Student} from "@/types/student.ts";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {FaRegPenToSquare} from "react-icons/fa6";
import {ReusableTableComponent} from "@/components/reusable-table.tsx";
import {FaRegStickyNote} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import Loading from "@/components/Loading.tsx";

const StudentsTable = () => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Student>();

  const {data, isFetching} = useQuery({
    queryKey: ['student'],
    queryFn: async () => {
      const res = await axios.get(`/student`);
      if (res) {
        return res.data.data;
      } else {
        console.error("No student data");
      }
    },
  });

  const handleActionClick = (studentId: number) => {
    navigate(`/student/${studentId}`);
  };

  const columns = [
    columnHelper.accessor("lastName", {
      header: () => "Student Name",
      cell: (row) => {
        return (
          <div className="text-center">
            {row.row.original.lastName}, {row.row.original.firstName}
          </div>
        );
      }
    }),
    columnHelper.accessor("course", {
      header: () => "Course and Year Level",
      cell: (row) => {
        const student = row.row.original;
        return `${student.course} - Year ${student.year}`;
      }
    }),
    columnHelper.accessor("mailingContactNumber", {
      header: () => "Contact Number",
      cell: (row) => {
        return (
          <div className="text-center">
            {row.row.original.mailingContactNumber}
          </div>
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
            onClick={() => handleActionClick(row.row.original.id)}
          >
            <FaRegStickyNote/>
          </button>
        </div>
      )
    })
  ]

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="container py-6">
        <Navbar/>
        <main className="flex-1 w-full flex justify-center">
          {isFetching ? <Loading/> : (
            // @ts-ignore
            <ReusableTableComponent data={data ? data : []} columns={columns} tableTitle="Students"/>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentsTable;