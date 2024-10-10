import { Recruiter } from "./IJob";

export interface IApplications {
  _id: string;
  status: string;
  userId: string;
  recruiterId: string;
  jobId: string;
  sop: string;
  dateOfApplication: string;
  dateOfJoining: string;
  jobApplicant: JobApplicant;
  job: Job;
  recruiter: Recruiter;
}

export interface JobApplicant {
  _id: string;
  skills: any[];
  rating: number;
  userId: string;
  name: string;
  education: Education[];
}

export interface Education {
  _id: string;
  institutionName: string;
  startYear: number;
  endYear: number;
}

export interface Job {
  _id: string;
  activeApplications: number;
  acceptedCandidates: number;
  skillsets: string[];
  rating: number;
  userId: string;
  title: string;
  maxApplicants: number;
  maxPositions: number;
  dateOfPosting: string;
  deadline: string;
  jobType: string;
  duration: number;
  salary: number;
}

export type IJobStatus =
  | "applied"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "finished";
