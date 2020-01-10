import { ITask } from 'app/shared/model/task.model';
import { IRole } from 'app/shared/model/role.model';

export interface IChallenge {
  id?: number;
  title?: string;
  description?: string;
  tasks?: ITask[];
  role?: IRole;
}

export const defaultValue: Readonly<IChallenge> = {};
