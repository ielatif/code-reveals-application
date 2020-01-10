import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './candidate.reducer';
import { ICandidate } from 'app/shared/model/candidate.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICandidateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CandidateDetail = (props: ICandidateDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { candidateEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="codeRevealsApplicationApp.candidate.detail.title">Candidate</Translate> [<b>{candidateEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="codeRevealsApplicationApp.candidate.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{candidateEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="codeRevealsApplicationApp.candidate.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{candidateEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="codeRevealsApplicationApp.candidate.email">Email</Translate>
            </span>
          </dt>
          <dd>{candidateEntity.email}</dd>
        </dl>
        <Button tag={Link} to="/candidate" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/candidate/${candidateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ candidate }: IRootState) => ({
  candidateEntity: candidate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetail);
