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
