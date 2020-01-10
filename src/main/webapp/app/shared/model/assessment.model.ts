import { IRole } from 'app/shared/model/role.model';
import { ICompany } from 'app/shared/model/company.model';
import { ICandidate } from 'app/shared/model/candidate.model';
import { IInterviewer } from 'app/shared/model/interviewer.model';

export interface IAssessment {
  id?: number;
  role?: IRole;
  company?: ICompany;
  candidate?: ICandidate;
  interviewer?: IInterviewer;
}

export const defaultValue: Readonly<IAssessment> = {};
