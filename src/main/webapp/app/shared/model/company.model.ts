import { IAssessment } from 'app/shared/model/assessment.model';
import { IUser } from 'app/shared/model/user.model';

export interface ICompany {
  id?: number;
  name?: string;
  assessments?: IAssessment[];
  user?: IUser;
}

export const defaultValue: Readonly<ICompany> = {};
