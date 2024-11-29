import Navbar from "@/components/Navbar.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {Consultation} from "@/types/consultation.ts";
import {useState} from "react";
import {User} from "@/types/user.ts";
import {ReusableTableComponent} from "@/components/reusable-table.tsx";
import {createColumnHelper} from "@tanstack/react-table";
import {FaFile, FaRegPenToSquare} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loading from "@/components/Loading.tsx";

type Props = {
  type: "pending" | "today" | "done"
}

const ConsultationsTable = (props: Props) => {
  const [user] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  const columnHelper = createColumnHelper<Consultation>();

  const {data, isFetching} = useQuery<Consultation[]>({
    queryKey: ['consultation', user],
    queryFn: async () => {
      const res = await axios.get(`/consultation/${user.id}?type=${props.type}`);
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
            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${value === 'LookUp-001' ? 'bg-gray-500 text-white' : value === 'LookUp-002' ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
        <span aria-hidden
              className={`absolute inset-0 ${value === 'LookUp-001' ? 'bg-gray-500' : value === 'LookUp-002' ? 'bg-primary' : 'bg-green-500'} opacity-50 rounded-full`}></span>
        <span className="relative">{value === 'LookUp-001' ? 'Pending' : value === 'LookUp-002' ? 'Scheduled' : 'Done'}</span>
      </span>
        );
      }
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: (row) => {
        const status = row.row.original.status;
        return (
          <div className="text-center">
            {status === 'LookUp-003' ? (
              <button
                className="px-2 py-2 bg-primary text-white rounded text-center"
                onClick={() => handleViewClick(row.row.original)}
              >
                <FaFile/>
              </button>
            ) : (
              <button
                className="px-2 py-2 bg-primary text-white rounded text-center"
                onClick={() => handleActionClick(row.row.original)}
              >
                <FaRegPenToSquare/>
              </button>
            )}
          </div>
        );
      }
    })
  ];

  const [showDialog, setShowDialog] = useState(true);

  const handleActionClick = (consultation: Consultation) => {
    // Define your action here
    console.log('Action clicked for consultation:', consultation);
  };

  const handleViewClick = (consultation: Consultation) => {

  }


  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="container py-6">
        <Navbar/>
        <main className="flex-1 w-full flex justify-center">
          {isFetching ? <div className="text-white"><Loading/></div> : (
            // @ts-ignore
            <ReusableTableComponent data={data ? data : []} columns={columns} tableTitle="Consultations" type={props.type}/>
          )}
        </main>
      </div>
    </div>
  );
};

export default ConsultationsTable;