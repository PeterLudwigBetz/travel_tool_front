import {
  UPDATE_TRAVEL_CHECKLIST,
  UPDATE_TRAVEL_CHECKLIST_SUCCESS,
  UPDATE_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST,
  FETCH_TRAVEL_CHECKLIST_FAILURE,
  FETCH_TRAVEL_CHECKLIST_SUCCESS
} from '../constants/actionTypes';

export const initialState = {
  isLoading: false,
  updatingChecklist: false,
  checklistItems: [],
  error: ''
};

const traveChecklist = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TRAVEL_CHECKLIST:
    return { ...state, isLoading: true };
  case FETCH_TRAVEL_CHECKLIST_SUCCESS:
    return { ...state, isLoading: false, checklistItems: action.travelChecklists, error: '' };
  case FETCH_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, isLoading: false, error: action.error, checklistItems: [] };
  case UPDATE_TRAVEL_CHECKLIST:
    return { ...state, updatingChecklist: true };
  case UPDATE_TRAVEL_CHECKLIST_SUCCESS:
    return { ...state, checklistItems: [...state.checklistItems], updatingChecklist: false };
  case UPDATE_TRAVEL_CHECKLIST_FAILURE:
    return { ...state, updatingChecklist: false, error: action.error };
  default: return state;
  }
};

export default traveChecklist;
