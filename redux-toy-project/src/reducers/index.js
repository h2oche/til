import {combineReducers} from 'redux';
import postReducer from './postReducer';

/*
init state = {
  posts: {
    items: [],
    item: {}
  }
}
*/

export default combineReducers({
  posts: postReducer
});