import { IChallenge } from 'app/shared/model/challenge.model';

export interface IRole {
  id?: number;
  name?: string;
  challenges?: IChallenge[];
}

export const defaultValue: Readonly<IRole> = {};
