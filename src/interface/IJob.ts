export interface ICreateJob {
  title: string;
  maxApplicants: number;
  maxPositions: number;
  deadline: string;
  skillsets: string[];
  jobType: string;
  duration: number;
  salary: number;
}

export interface IJobLists {
  _id: string;
  activeApplications: number;
  acceptedCandidates: number;
  skillsets: any[];
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
  recruiter: Recruiter;
}

export interface Recruiter {
  _id: string;
  userId: string;
  name: string;
  contactNumber: string;
  bio: string;
}
