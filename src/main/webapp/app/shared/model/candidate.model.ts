import { IAssessment } from 'app/shared/model/assessment.model';

export interface ICandidate {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  assessments?: IAssessment[];
}

export const defaultValue: Readonly<ICandidate> = {};
