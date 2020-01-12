import { IAssessment } from 'app/shared/model/assessment.model';

export interface ICompany {
  id?: number;
  name?: string;
  assessments?: IAssessment[];
}

export const defaultValue: Readonly<ICompany> = {};
