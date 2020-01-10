import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRole } from 'app/shared/model/role.model';
import { getEntities as getRoles } from 'app/entities/role/role.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntities as getCandidates } from 'app/entities/candidate/candidate.reducer';
import { IInterviewer } from 'app/shared/model/interviewer.model';
import { getEntities as getInterviewers } from 'app/entities/interviewer/interviewer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './assessment.reducer';
import { IAssessment } from 'app/shared/model/assessment.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssessmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssessmentUpdate = (props: IAssessmentUpdateProps) => {
  const [roleId, setRoleId] = useState('0');
  const [companyId, setCompanyId] = useState('0');
  const [candidateId, setCandidateId] = useState('0');
  const [interviewerId, setInterviewerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { assessmentEntity, roles, companies, candidates, interviewers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/assessment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getRoles();
    props.getCompanies();
    props.getCandidates();
    props.getInterviewers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...assessmentEntity,
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
          <h2 id="codeRevealsApplicationApp.assessment.home.createOrEditLabel">
            <Translate contentKey="codeRevealsApplicationApp.assessment.home.createOrEditLabel">Create or edit a Assessment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : assessmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="assessment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="assessment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="assessment-role">
                  <Translate contentKey="codeRevealsApplicationApp.assessment.role">Role</Translate>
                </Label>
                <AvInput id="assessment-role" type="select" className="form-control" name="role.id">
                  <option value="" key="0" />
                  {roles
                    ? roles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="assessment-company">
                  <Translate contentKey="codeRevealsApplicationApp.assessment.company">Company</Translate>
                </Label>
                <AvInput id="assessment-company" type="select" className="form-control" name="company.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="assessment-candidate">
                  <Translate contentKey="codeRevealsApplicationApp.assessment.candidate">Candidate</Translate>
                </Label>
                <AvInput id="assessment-candidate" type="select" className="form-control" name="candidate.id">
                  <option value="" key="0" />
                  {candidates
                    ? candidates.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="assessment-interviewer">
                  <Translate contentKey="codeRevealsApplicationApp.assessment.interviewer">Interviewer</Translate>
                </Label>
                <AvInput id="assessment-interviewer" type="select" className="form-control" name="interviewer.id">
                  <option value="" key="0" />
                  {interviewers
                    ? interviewers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/assessment" replace color="info">
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
  roles: storeState.role.entities,
  companies: storeState.company.entities,
  candidates: storeState.candidate.entities,
  interviewers: storeState.interviewer.entities,
  assessmentEntity: storeState.assessment.entity,
  loading: storeState.assessment.loading,
  updating: storeState.assessment.updating,
  updateSuccess: storeState.assessment.updateSuccess
});

const mapDispatchToProps = {
  getRoles,
  getCompanies,
  getCandidates,
  getInterviewers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentUpdate);
