import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './interviewer.reducer';
import { IInterviewer } from 'app/shared/model/interviewer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInterviewerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InterviewerDetail = (props: IInterviewerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { interviewerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="codeRevealsApplicationApp.interviewer.detail.title">Interviewer</Translate> [<b>{interviewerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="codeRevealsApplicationApp.interviewer.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{interviewerEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="codeRevealsApplicationApp.interviewer.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{interviewerEntity.lastName}</dd>
          <dt>
            <span id="experience">
              <Translate contentKey="codeRevealsApplicationApp.interviewer.experience">Experience</Translate>
            </span>
          </dt>
          <dd>{interviewerEntity.experience}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="codeRevealsApplicationApp.interviewer.role">Role</Translate>
            </span>
          </dt>
          <dd>{interviewerEntity.role}</dd>
          <dt>
            <span id="workAt">
              <Translate contentKey="codeRevealsApplicationApp.interviewer.workAt">Work At</Translate>
            </span>
          </dt>
          <dd>{interviewerEntity.workAt}</dd>
        </dl>
        <Button tag={Link} to="/interviewer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/interviewer/${interviewerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ interviewer }: IRootState) => ({
  interviewerEntity: interviewer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InterviewerDetail);
