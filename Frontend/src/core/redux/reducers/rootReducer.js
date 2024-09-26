import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dungeonReducer from './dungeonReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  // characters: characterReducer,
  dungeons: dungeonReducer,
});

export default rootReducer;
