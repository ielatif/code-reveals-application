import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './interviewer.reducer';
import { IInterviewer } from 'app/shared/model/interviewer.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInterviewerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InterviewerUpdate = (props: IInterviewerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { interviewerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/interviewer');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...interviewerEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="codeRevealsApplicationApp.interviewer.home.createOrEditLabel">
            <Translate contentKey="codeRevealsApplicationApp.interviewer.home.createOrEditLabel">Create or edit a Interviewer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : interviewerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="interviewer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="interviewer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="interviewer-firstName">
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.firstName">First Name</Translate>
                </Label>
                <AvField id="interviewer-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="interviewer-lastName">
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.lastName">Last Name</Translate>
                </Label>
                <AvField id="interviewer-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="experienceLabel" for="interviewer-experience">
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.experience">Experience</Translate>
                </Label>
                <AvField id="interviewer-experience" type="text" name="experience" />
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="interviewer-role">
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.role">Role</Translate>
                </Label>
                <AvField id="interviewer-role" type="text" name="role" />
              </AvGroup>
              <AvGroup>
                <Label id="workAtLabel" for="interviewer-workAt">
                  <Translate contentKey="codeRevealsApplicationApp.interviewer.workAt">Work At</Translate>
                </Label>
                <AvField id="interviewer-workAt" type="text" name="workAt" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/interviewer" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  interviewerEntity: storeState.interviewer.entity,
  loading: storeState.interviewer.loading,
  updating: storeState.interviewer.updating,
  updateSuccess: storeState.interviewer.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InterviewerUpdate);
