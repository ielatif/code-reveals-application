import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Assessment from './assessment';
import AssessmentDetail from './assessment-detail';
import AssessmentUpdate from './assessment-update';
import AssessmentDeleteDialog from './assessment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AssessmentDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AssessmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AssessmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AssessmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Assessment} />
    </Switch>
  </>
);

export default Routes;
