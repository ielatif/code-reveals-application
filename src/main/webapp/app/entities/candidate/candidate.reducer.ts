import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICandidate, defaultValue } from 'app/shared/model/candidate.model';

export const ACTION_TYPES = {
  FETCH_CANDIDATE_LIST: 'candidate/FETCH_CANDIDATE_LIST',
  FETCH_CANDIDATE: 'candidate/FETCH_CANDIDATE',
  CREATE_CANDIDATE: 'candidate/CREATE_CANDIDATE',
  UPDATE_CANDIDATE: 'candidate/UPDATE_CANDIDATE',
  DELETE_CANDIDATE: 'candidate/DELETE_CANDIDATE',
  RESET: 'candidate/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICandidate>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CandidateState = Readonly<typeof initialState>;

// Reducer

export default (state: CandidateState = initialState, action): CandidateState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CANDIDATE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CANDIDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CANDIDATE):
    case REQUEST(ACTION_TYPES.UPDATE_CANDIDATE):
    case REQUEST(ACTION_TYPES.DELETE_CANDIDATE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CANDIDATE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CANDIDATE):
    case FAILURE(ACTION_TYPES.CREATE_CANDIDATE):
    case FAILURE(ACTION_TYPES.UPDATE_CANDIDATE):
    case FAILURE(ACTION_TYPES.DELETE_CANDIDATE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CANDIDATE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CANDIDATE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CANDIDATE):
    case SUCCESS(ACTION_TYPES.UPDATE_CANDIDATE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CANDIDATE):
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

const apiUrl = 'api/candidates';

// Actions

export const getEntities: ICrudGetAllAction<ICandidate> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CANDIDATE_LIST,
  payload: axios.get<ICandidate>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICandidate> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CANDIDATE,
    payload: axios.get<ICandidate>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICandidate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CANDIDATE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICandidate> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CANDIDATE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICandidate> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CANDIDATE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
