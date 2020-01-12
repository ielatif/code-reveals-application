import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAssessment, defaultValue } from 'app/shared/model/assessment.model';

export const ACTION_TYPES = {
  FETCH_ASSESSMENT_LIST: 'assessment/FETCH_ASSESSMENT_LIST',
  FETCH_ASSESSMENT: 'assessment/FETCH_ASSESSMENT',
  CREATE_ASSESSMENT: 'assessment/CREATE_ASSESSMENT',
  UPDATE_ASSESSMENT: 'assessment/UPDATE_ASSESSMENT',
  DELETE_ASSESSMENT: 'assessment/DELETE_ASSESSMENT',
  RESET: 'assessment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAssessment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AssessmentState = Readonly<typeof initialState>;

// Reducer

export default (state: AssessmentState = initialState, action): AssessmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ASSESSMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ASSESSMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ASSESSMENT):
    case REQUEST(ACTION_TYPES.UPDATE_ASSESSMENT):
    case REQUEST(ACTION_TYPES.DELETE_ASSESSMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ASSESSMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ASSESSMENT):
    case FAILURE(ACTION_TYPES.CREATE_ASSESSMENT):
    case FAILURE(ACTION_TYPES.UPDATE_ASSESSMENT):
    case FAILURE(ACTION_TYPES.DELETE_ASSESSMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSESSMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSESSMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ASSESSMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_ASSESSMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ASSESSMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/assessments';

// Actions

export const getEntities: ICrudGetAllAction<IAssessment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ASSESSMENT_LIST,
  payload: axios.get<IAssessment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAssessment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ASSESSMENT,
    payload: axios.get<IAssessment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAssessment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ASSESSMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAssessment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ASSESSMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAssessment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ASSESSMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
