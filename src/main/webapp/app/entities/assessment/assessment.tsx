import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './assessment.reducer';
import { IAssessment } from 'app/shared/model/assessment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssessmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Assessment = (props: IAssessmentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { assessmentList, match } = props;
  return (
    <div>
      <h2 id="assessment-heading">
        <Translate contentKey="codeRevealsApplicationApp.assessment.home.title">Assessments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="codeRevealsApplicationApp.assessment.home.createLabel">Create new Assessment</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {assessmentList && assessmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.assessment.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.assessment.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.assessment.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.assessment.candidate">Candidate</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.assessment.interviewer">Interviewer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assessmentList.map((assessment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${assessment.id}`} color="link" size="sm">
                      {assessment.id}
                    </Button>
                  </td>
                  <td>{assessment.name}</td>
                  <td>{assessment.role ? <Link to={`role/${assessment.role.id}`}>{assessment.role.id}</Link> : ''}</td>
                  <td>{assessment.company ? <Link to={`company/${assessment.company.id}`}>{assessment.company.id}</Link> : ''}</td>
                  <td>{assessment.candidate ? <Link to={`candidate/${assessment.candidate.id}`}>{assessment.candidate.id}</Link> : ''}</td>
                  <td>
                    {assessment.interviewer ? <Link to={`interviewer/${assessment.interviewer.id}`}>{assessment.interviewer.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${assessment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assessment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assessment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="codeRevealsApplicationApp.assessment.home.notFound">No Assessments found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ assessment }: IRootState) => ({
  assessmentList: assessment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Assessment);
