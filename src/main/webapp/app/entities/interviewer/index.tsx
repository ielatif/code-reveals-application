import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Interviewer from './interviewer';
import InterviewerDetail from './interviewer-detail';
import InterviewerUpdate from './interviewer-update';
import InterviewerDeleteDialog from './interviewer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InterviewerDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InterviewerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InterviewerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InterviewerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Interviewer} />
    </Switch>
  </>
);

export default Routes;
