import { IAssessment } from 'app/shared/model/assessment.model';

export interface IInterviewer {
  id?: number;
  firstName?: string;
  lastName?: string;
  experience?: string;
  role?: string;
  workAt?: string;
  assessments?: IAssessment[];
}

export const defaultValue: Readonly<IInterviewer> = {};
