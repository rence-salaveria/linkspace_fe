import {Student} from "@/types/student.ts";

export interface Consultation {
  createdAt: string
  updatedAt: string
  id: number
  scheduleDate: any
  status: "LookUp-001" | "LookUp-002" | "LookUp-003"
  concern: string
  counselorComment: string
  counselorId: number
  studentId: number
  student: Student
}
