import { IChallenge } from 'app/shared/model/challenge.model';

export interface ITask {
  id?: number;
  name?: string;
  challenge?: IChallenge;
}

export const defaultValue: Readonly<ITask> = {};
