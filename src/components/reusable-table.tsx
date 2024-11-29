import React, {useEffect, useMemo, useState} from 'react';
import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import {useNavigate} from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Consultation} from "@/types/consultation.ts";
import StudentDropdown from "@/components/StudentDropdown.tsx";
import {useQuery} from "@tanstack/react-query";
import axios from "@/lib/axios.ts";
import toast from "react-hot-toast";
import {Textarea} from "@/components/ui/textarea.tsx";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  tableTitle?: string;
  type?: "pending" | "today" | "done" | null;
}

export function ReusableTableComponent<T extends Record<string, any>>({
                                                                        data,
                                                                        columns,
                                                                        tableTitle,
                                                                        type
                                                                      }: ReusableTableProps<T>) {
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === 'object' && value !== null) {
          // Concatenate name, course, and year for filtering
          const nameCourseYear = `${value.lastName}, ${value.firstName} - ${value.course} - Year ${value.year}`;
          return nameCourseYear.toLowerCase().includes(filterText.toLowerCase());
        }
        return value != null && value.toString().toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [data, filterText]);

  const table = useReactTable<T>({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel<T>(),
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold leading-tight text-white">
            {tableTitle || 'Table'}
          </h2>
          <div className="flex flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            {tableTitle === 'Students' && (
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={() => navigate('/add/student')}>Add Student</button>
            )}
            {tableTitle === 'Consultations' && type === 'pending' && (
              <AddConsultationDialog/>
            )}
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <div className="max-h-[40rem] overflow-y-auto">
              <table className="min-w-full leading-normal">
                <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-primary text-white">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-6 py-3 text-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
                </thead>
                <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center">No data yet</td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="odd:bg-gray-100 even:bg-white">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 align-middle text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddConsultationDialog() {
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

  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [concern, setConcern] = useState<string>('');
  const [counselorComment, setCounselorComment] = useState<string>('');

  const handleSubmit = async () => {
    if (selectedStudent && scheduleDate && concern && counselorComment) {
      // Add consultation API call
    } else {
      toast.error('Please fill out all fields');
    }
  }

  useEffect(() => {
    console.log(selectedStudent)
  }, [selectedStudent]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Consultation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Consultation</DialogTitle>
          <DialogDescription>
            Add new consultation details here and Save
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student" className="text-right">
              Student
            </Label>
            <StudentDropdown options={data!} isFetching={isFetching!} setSelectedStudent={setSelectedStudent}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="scheduleDate" className="text-right">
              Schedule Date
            </Label>
            <Input
              id="scheduleDate"
              type="datetime-local"
              className="col-span-3"
              value={scheduleDate ? scheduleDate.toISOString().split('T')[0] : ''}
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
              value={counselorComment}
              onChange={(e) => setCounselorComment(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
