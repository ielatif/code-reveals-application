import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './challenge.reducer';
import { IChallenge } from 'app/shared/model/challenge.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChallengeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Challenge = (props: IChallengeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { challengeList, match } = props;
  return (
    <div>
      <h2 id="challenge-heading">
        <Translate contentKey="codeRevealsApplicationApp.challenge.home.title">Challenges</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="codeRevealsApplicationApp.challenge.home.createLabel">Create new Challenge</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {challengeList && challengeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.challenge.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.challenge.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="codeRevealsApplicationApp.challenge.role">Role</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {challengeList.map((challenge, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${challenge.id}`} color="link" size="sm">
                      {challenge.id}
                    </Button>
                  </td>
                  <td>{challenge.title}</td>
                  <td>{challenge.description}</td>
                  <td>{challenge.role ? <Link to={`role/${challenge.role.id}`}>{challenge.role.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${challenge.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${challenge.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${challenge.id}/delete`} color="danger" size="sm">
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
            <Translate contentKey="codeRevealsApplicationApp.challenge.home.notFound">No Challenges found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ challenge }: IRootState) => ({
  challengeList: challenge.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
