import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInterviewer, defaultValue } from 'app/shared/model/interviewer.model';

export const ACTION_TYPES = {
  FETCH_INTERVIEWER_LIST: 'interviewer/FETCH_INTERVIEWER_LIST',
  FETCH_INTERVIEWER: 'interviewer/FETCH_INTERVIEWER',
  CREATE_INTERVIEWER: 'interviewer/CREATE_INTERVIEWER',
  UPDATE_INTERVIEWER: 'interviewer/UPDATE_INTERVIEWER',
  DELETE_INTERVIEWER: 'interviewer/DELETE_INTERVIEWER',
  RESET: 'interviewer/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInterviewer>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InterviewerState = Readonly<typeof initialState>;

// Reducer

export default (state: InterviewerState = initialState, action): InterviewerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INTERVIEWER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTERVIEWER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INTERVIEWER):
    case REQUEST(ACTION_TYPES.UPDATE_INTERVIEWER):
    case REQUEST(ACTION_TYPES.DELETE_INTERVIEWER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INTERVIEWER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTERVIEWER):
    case FAILURE(ACTION_TYPES.CREATE_INTERVIEWER):
    case FAILURE(ACTION_TYPES.UPDATE_INTERVIEWER):
    case FAILURE(ACTION_TYPES.DELETE_INTERVIEWER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERVIEWER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERVIEWER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INTERVIEWER):
    case SUCCESS(ACTION_TYPES.UPDATE_INTERVIEWER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INTERVIEWER):
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

const apiUrl = 'api/interviewers';

// Actions

export const getEntities: ICrudGetAllAction<IInterviewer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INTERVIEWER_LIST,
  payload: axios.get<IInterviewer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInterviewer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INTERVIEWER,
    payload: axios.get<IInterviewer>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInterviewer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INTERVIEWER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInterviewer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INTERVIEWER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInterviewer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INTERVIEWER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
