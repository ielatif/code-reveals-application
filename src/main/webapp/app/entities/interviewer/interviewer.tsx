import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './interviewer.reducer';
import { IInterviewer } from 'app/shared/model/interviewer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInterviewerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Interviewer = (props: IInterviewerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { interviewerList, match } = props;
  return (
    <div>
      <h2 id="interviewer-heading">
        <Translate contentKey="codeRevealsApplicationApp.interviewer.home.title">Interviewers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="codeRevealsApplicationApp.interviewer.home.createLabel">Create new Interviewer</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {interviewerList && interviewerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.experience">Experience</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.workAt">Work At</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {interviewerList.map((interviewer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${interviewer.id}`} color="link" size="sm">
                      {interviewer.id}
                    </Button>
                  </td>
                  <td>{interviewer.firstName}</td>
                  <td>{interviewer.lastName}</td>
                  <td>{interviewer.experience}</td>
                  <td>{interviewer.role}</td>
                  <td>{interviewer.workAt}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${interviewer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${interviewer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${interviewer.id}/delete`} color="danger" size="sm">
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
            <Translate contentKey="codeRevealsApplicationApp.interviewer.home.notFound">No Interviewers found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ interviewer }: IRootState) => ({
  interviewerList: interviewer.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Interviewer);
