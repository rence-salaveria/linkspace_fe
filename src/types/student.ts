export interface Student {
  createdAt: string;
  updatedAt: string;
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  nickname?: string;
  gender: string;
  course: string;
  year: string;
  idNumber: string;
  birthdate: string;
  mailingAddress: string;
  mailingContactNumber: string;
  permanentAddress?: string;
  permanentContactNumber?: string;
  residency: "owned" | "rent" | "others" | string;
  civilStatus: "single" | "married" | "widowed" | "separated" | "annulled";
  religion: string;
  spouseName?: string;
  spouseOccupation?: string;
  birthOrder: number;
  brotherCount: number;
  sisterCount: number;
  totalSiblings: number;
  livingWith: "parent" | "guardian" | "others" | string;
  fatherLiving: number;
  fatherName: string;
  fatherNationality: string;
  fatherReligion: string;
  fatherEducAttainment: string;
  fatherOccupation: string;
  fatherCompany: string;
  fatherBirthdate: string;
  fatherContactNumber?: string;
  motherLiving: number;
  motherName: string;
  motherNationality: string;
  motherReligion: string;
  motherEducAttainment: string;
  motherOccupation: string;
  motherCompany: string;
  motherBirthdate: string;
  motherContactNumber?: string;
  monthlyIncome: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianAddress?: string;
  guardianContactNumber?: string;
  guardianEmail?: string;
  emergencyContact?: string;
  emergencyContactNumber?: string;
  educStatus: string[];
  educBackground?: EducBackground[];
  educAssistance: number;
  educAssistanceInfo?: string;
  institutionalAffiliations?: InstitutionalAffiliation[];
  workExperience?: WorkExperience[];
  interest?: string[];
  talents?: string[];
  characteristics?: string[];
  selfImageAnswer: string;
  selfMotivationAnswer: string;
  decisionMakingAnswer: string;
  infoSheet: string
  photo: string
}

export interface EducBackground {
  year: string;
  level: string;
  honors: string;
  address: string;
  schoolName: string;
}

export interface InstitutionalAffiliation {
  year: string;
  status: boolean;
  affiliation: string;
  organization: string;
}

export interface WorkExperience {
  position: string;
  dateRange: string;
  companyName: string;
}

export interface StudentFormFields {
  firstName: string;
  lastName: string;
  middleName?: string;
  nickname?: string;
  gender: string;
  course: string;
  year: string;
  idNumber: string;
  birthdate: string;
  mailingAddress: string;
  mailingContactNumber: string;
  permanentAddress?: string;
  permanentContactNumber?: string;
  residency: "owned" | "rent" | "others" | string;
  civilStatus: "single" | "married" | "widowed" | "separated" | "annulled" | string;
  religion: string;
  spouseName?: string;
  spouseOccupation?: string;
  birthOrder: number;
  brotherCount: number;
  sisterCount: number;
  totalSiblings: number;
  livingWith: "parent" | "guardian" | "others" | string;
  fatherLiving: number;
  fatherName: string;
  fatherNationality: string;
  fatherReligion: string;
  fatherEducAttainment: string;
  fatherOccupation: string;
  fatherCompany: string;
  fatherBirthdate: string;
  fatherContactNumber?: string;
  motherLiving: number;
  motherName: string;
  motherNationality: string;
  motherReligion: string;
  motherEducAttainment: string;
  motherOccupation: string;
  motherCompany: string;
  motherBirthdate: string;
  motherContactNumber?: string;
  monthlyIncome: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianAddress?: string;
  guardianContactNumber?: string;
  guardianEmail?: string;
  emergencyContact?: string;
  emergencyContactNumber?: string;
  educStatus: string[];
  educBackground?: EducBackground[];
  educAssistance: number;
  educAssistanceInfo?: string;
  institutionalAffiliations?: InstitutionalAffiliation[];
  workExperience?: WorkExperience[];
  interest?: string[];
  talents?: string[];
  characteristics?: string[];
  selfImageAnswer: string;
  selfMotivationAnswer: string;
  decisionMakingAnswer: string;
  infoSheetPath: {
    file: string,
    path: string
  };
  photo: {
    file: string,
    path: string
  };
}