import Navbar from "@/components/Navbar.tsx";
import Loading from "@/components/Loading.tsx";
import {ReusableTableComponent} from "@/components/reusable-table.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {FaRegStickyNote} from "react-icons/fa";
import {createColumnHelper} from "@tanstack/react-table";
import {Audit} from "@/types/audit.ts";

const AuditTrailTable = () => {
  const columnHelper = createColumnHelper<Audit>();

  const {data, isFetching} = useQuery({
    queryKey: ['audit'],
    queryFn: async () => {
      const res = await axios.get(`/user/audit`);
      if (res) {
        console.log(res.data.payload);
        return res.data.payload || [];
      } else {
        console.error("No audit data");
      }
    },
  });

  const columns = [
    columnHelper.accessor("id", {
      header: () => "ID",
      cell: (row) => {
        return (
          <div className="text-center">
            {row.row.original.id}
          </div>
        );
      }
    }),
    columnHelper.accessor("actionType", {
      header: () => "ACTION",
      cell: (row) => {
        return `${row.row.original.actionType.toUpperCase()} ${row.row.original.actionItem.toUpperCase()}`;
      }
    }),
    columnHelper.accessor("actionItem", {
      header: () => "RESOURCE",
      cell: (row) => {
        if (row.row.original.actionItem === "user") {
          return (
            <div className="text-center">
              {row.row.original.user?.fullName}
            </div>
          );
        } else if (row.row.original.actionItem === "student") {
          return (
            <div className="text-center">
              {row.row.original.student?.firstName} {row.row.original.student?.lastName}
            </div>
          );
        } else if (row.row.original.actionItem === "consultation") {
          return (
            <div className="text-center">
              {row.row.original?.student.firstName} {row.row.original?.student.lastName}
            </div>
          );
        }
      }
    }),
    columnHelper.accessor("createdAt", {
      header: () => "DATE",
      cell: (row) => new Date(row.getValue()).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }),
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

export default AuditTrailTable;