export interface IEducation {
  institutionName: string;
  startYear: string;
  endYear: string;
}

export interface IApplicantProfile {
  name: string;
  education: IEducation[];
  skills: string[];
  userId: string;
  _id: string;
}

export interface IRecruiterProfile {
  name: string;
  bio: string;
  contactNumber: string;
  userId: string;
  _id: string;
}
