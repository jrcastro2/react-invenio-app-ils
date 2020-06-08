import { SUCCESS as FETCH_SERIES_SUCCESS } from '../../state/actions';
import { IS_LOADING, SUCCESS, HAS_ERROR } from './actions';

export const initialState = {
  isLoading: true,
  hasError: false,
  data: {},
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case FETCH_SERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.metadata.relations,
        error: {},
        hasError: false,
      };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: {},
        hasError: false,
      };
    case HAS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        hasError: true,
      };
    default:
      return state;
  }
};
