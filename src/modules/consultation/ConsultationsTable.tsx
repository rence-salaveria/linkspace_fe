import Navbar from "@/components/Navbar.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import {Consultation} from "@/types/consultation.ts";
import React, {useEffect, useRef, useState} from "react";
import {User} from "@/types/user.ts";
import {ReusableTableComponent} from "@/components/reusable-table.tsx";
import {createColumnHelper} from "@tanstack/react-table";
import {FaFile, FaRegPenToSquare} from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loading from "@/components/Loading.tsx";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import StudentDropdown from "@/components/StudentDropdown.tsx";
import {Input} from "@/components/ui/input.tsx";
// import {format, isToday} from "date-fns";
import { format, toZonedTime } from 'date-fns-tz';
import {Textarea} from "@/components/ui/textarea.tsx";
import {useLocation} from "react-router-dom";
import {isToday} from "date-fns";

type Props = {
  type: "pending" | "today" | "done"
}

const ConsultationsTable = (props: Props) => {
  const [user] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));
  const columnHelper = createColumnHelper<Consultation>();

  const location = useLocation()
  const cardName = location.pathname.split("/")[2] as "consultation" | "today-consultation";

  const [flag, setFlag] = useState(0);

  const {data, isFetching} = useQuery<Consultation[]>({
    queryKey: ['consultation', user, flag],
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
    columnHelper.accessor("createdAt", {
      header: () => "Date Created",
      cell: (row) => new Date(row.getValue()).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }),
    columnHelper.accessor("scheduleDate", {
      header: () => "Schedule Date and Time",
      cell: (row) => {
        const scheduleDate = row.getValue();
        return scheduleDate ? new Date(scheduleDate).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : 'No Schedule Yet';
      }
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (row) => {
        const value = row.getValue();
        return (
          <span
            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
              value === 'LookUp-001' ? 'bg-gray-500 text-white' :
                value === 'LookUp-002' ? 'bg-primary text-white' :
                  value === 'LookUp-003' ? 'bg-green-500 text-white' :
                    'bg-red-500 text-white'
            }`}>
        <span aria-hidden
              className={`absolute inset-0 ${
                value === 'LookUp-001' ? 'bg-gray-500' :
                  value === 'LookUp-002' ? 'bg-primary' :
                    value === 'LookUp-003' ? 'bg-green-500' :
                      'bg-red-500'
              } opacity-50 rounded-full`}></span>
        <span className="relative">
          {value === 'LookUp-001' ? 'Pending' :
            value === 'LookUp-002' ? 'Scheduled' :
              value === 'LookUp-003' ? 'Done' :
                'Cancelled'}
        </span>
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
            {status === 'LookUp-003' || status === "LookUp-004" ? (
              <ViewConsultationDialog mode={"view"} consultation={row.row.original} setFlag={setFlag} cardName={cardName}/>
            ) : (
              <ViewConsultationDialog mode={"edit"} consultation={row.row.original} setFlag={setFlag} cardName={cardName}/>
            )}
          </div>
        );
      }
    })
  ];

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="container py-6">
        <Navbar/>
        <main className="flex-1 w-full flex justify-center">
          {isFetching ? <div className="text-white"><Loading/></div> : (
            // @ts-ignore
            <ReusableTableComponent data={data ? data : []} columns={columns} tableTitle="Consultations" type={props.type} setFlag={setFlag}/>
          )}
        </main>
      </div>
    </div>
  );
};


type SubProps = {
  mode: "view" | "edit",
  consultation: Consultation,
  setFlag: (flag: (prev) => any) => void
  cardName: "consultation" | "today-consultation"
}

function ViewConsultationDialog(props: SubProps) {
  const [scheduleDate, setScheduleDate] = useState<Date | null>(props.consultation.scheduleDate);
  const [concern, setConcern] = useState<string>(props.consultation.concern);
  const [counselorComment, setCounselorComment] = useState<string>(props.consultation.counselorComment);


  const dialogRef = useRef(null);

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleSubmit = async () => {
    if (concern && counselorComment) {
      const response = await toast.promise(axios.post(`/consultation/update/${props.consultation.id}`, {
        scheduleDate,
        concern,
        counselorComment
      }), {
        success: "Update consultation successfully",
        error: "Failed to update consultation",
        loading: "Updating consultation..."
      })

      console.log(response)

      props.setFlag((prev) => prev + 1);

      closeDialog();
    } else {
      toast.error('Please fill out all fields');
    }
  }

  const handleCancel = async () => {
    const response = await toast.promise(axios.post(`/consultation/cancel/${props.consultation.id}`), {
      success: "Consultation cancelled successfully",
      error: "Failed to cancel consultation",
      loading: "Cancelling consultation..."
    })

    props.setFlag((prev) => prev + 1);

    closeDialog();
  }

  const handleComplete = async () => {
    const response = await toast.promise(axios.post(`/consultation/complete/${props.consultation.id}`), {
      success: "Consultation completed successfully",
      error: "Failed to complete consultation",
      loading: "Completing consultation..."
    })

    props.setFlag((prev) => prev + 1);

    closeDialog();
  }

  useEffect(() => {
    console.log(props.cardName)
  }, [location]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-2 py-2 bg-primary text-white rounded text-center">
          {props.mode === 'view' ? <FaFile/> :  <FaRegPenToSquare/>}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.mode === 'view' ? 'View' : 'Edit'} Consultation</DialogTitle>
          <DialogDescription>
            {props.mode === 'view' ? `Check consultation info for ${props.consultation.student.firstName} ${props.consultation.student.lastName}`
              : `Edit consultation info for ${props.consultation.student.firstName} ${props.consultation.student.lastName}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student" className="text-right">
              Student
            </Label>
            <Input type="text"
                   className="col-span-3"
                   value={`${props.consultation.student.firstName} ${props.consultation.student.lastName}`}
                   disabled/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scheduleDate" className="text-right">
              Schedule Date
            </Label>
            <Input
              id="scheduleDate"
              type="datetime-local"
              className="col-span-3"
              disabled={props.mode === 'view'}
              value={scheduleDate ? format(scheduleDate, "yyyy-MM-dd'T'HH:mm") : ''}
              onChange={(e) => setScheduleDate(e.target.value ? new Date(e.target.value) : null)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="concern" className="text-right">
              Concern
            </Label>
            <Textarea
              id="concern"
              className="col-span-3"
              value={concern}
              disabled={props.mode === 'view'}
              placeholder={"Enter the student's concern here"}
              onChange={(e) => setConcern(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="counselorComment" className="text-right">
              Counselor Comment
            </Label>
            <Textarea
              id="counselorComment"
              className="col-span-3"
              placeholder={"Enter your comment here"}
              value={counselorComment}
              disabled={props.mode === 'view'}
              onChange={(e) => setCounselorComment(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          {props.mode === 'edit' && (
            <div>
              <Button variant="destructive" type="button" onClick={handleCancel} className="me-2">Cancel Consultation</Button>
              {isToday(props.consultation.scheduleDate) && props.cardName === 'today-consultation' ? (
                <Button type="button" className="bg-success" onClick={handleComplete}>Complete</Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>Save changes</Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default ConsultationsTable;