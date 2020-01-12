import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import assessment, {
  AssessmentState
} from 'app/entities/assessment/assessment.reducer';
// prettier-ignore
import candidate, {
  CandidateState
} from 'app/entities/candidate/candidate.reducer';
// prettier-ignore
import interviewer, {
  InterviewerState
} from 'app/entities/interviewer/interviewer.reducer';
// prettier-ignore
import role, {
  RoleState
} from 'app/entities/role/role.reducer';
// prettier-ignore
import challenge, {
  ChallengeState
} from 'app/entities/challenge/challenge.reducer';
// prettier-ignore
import task, {
  TaskState
} from 'app/entities/task/task.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly company: CompanyState;
  readonly assessment: AssessmentState;
  readonly candidate: CandidateState;
  readonly interviewer: InterviewerState;
  readonly role: RoleState;
  readonly challenge: ChallengeState;
  readonly task: TaskState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  company,
  assessment,
  candidate,
  interviewer,
  role,
  challenge,
  task,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
