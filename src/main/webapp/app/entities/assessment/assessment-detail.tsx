import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './assessment.reducer';
import { IAssessment } from 'app/shared/model/assessment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssessmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssessmentDetail = (props: IAssessmentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { assessmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="codeRevealsApplicationApp.assessment.detail.title">Assessment</Translate> [<b>{assessmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="codeRevealsApplicationApp.assessment.role">Role</Translate>
          </dt>
          <dd>{assessmentEntity.role ? assessmentEntity.role.id : ''}</dd>
          <dt>
            <Translate contentKey="codeRevealsApplicationApp.assessment.company">Company</Translate>
          </dt>
          <dd>{assessmentEntity.company ? assessmentEntity.company.id : ''}</dd>
          <dt>
            <Translate contentKey="codeRevealsApplicationApp.assessment.candidate">Candidate</Translate>
          </dt>
          <dd>{assessmentEntity.candidate ? assessmentEntity.candidate.id : ''}</dd>
          <dt>
            <Translate contentKey="codeRevealsApplicationApp.assessment.interviewer">Interviewer</Translate>
          </dt>
          <dd>{assessmentEntity.interviewer ? assessmentEntity.interviewer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/assessment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/assessment/${assessmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ assessment }: IRootState) => ({
  assessmentEntity: assessment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentDetail);
