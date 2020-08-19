import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';
import { eventReducer } from './eventReducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    event: eventReducer,
});
