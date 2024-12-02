import { Student } from "./student"
import {User} from "@/types/user.ts";
import {Consultation} from "@/types/consultation.ts";

export interface Audit {
  id: number
  actionType: 'create' | 'update'
  actionItem: 'user' | 'student' | 'consultation'
  createdAt: string
  updatedAt: string
  userId?: number
  consultationId?: number
  studentId?: number
  consultation?: Consultation
  student?: Student
  user?: User
}