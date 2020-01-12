import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Company from './company';
import Assessment from './assessment';
import Candidate from './candidate';
import Interviewer from './interviewer';
import Role from './role';
import Challenge from './challenge';
import Task from './task';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}assessment`} component={Assessment} />
      <ErrorBoundaryRoute path={`${match.url}candidate`} component={Candidate} />
      <ErrorBoundaryRoute path={`${match.url}interviewer`} component={Interviewer} />
      <ErrorBoundaryRoute path={`${match.url}role`} component={Role} />
      <ErrorBoundaryRoute path={`${match.url}challenge`} component={Challenge} />
      <ErrorBoundaryRoute path={`${match.url}task`} component={Task} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
