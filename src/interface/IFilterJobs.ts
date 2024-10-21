export interface IFilterJobs {
  jobType: {
    fullTime: boolean;
    partTime: boolean;
    wfh: boolean;
  };
  salaryMin: number;
  salaryMax: number;
  duration: string;
  salaryAesc: boolean;
  salaryDesc: boolean;
  durationAesc: boolean;
  durationDesc: boolean;
  ratingAesc: boolean;
  ratingDesc: boolean;
}
