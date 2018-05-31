import { FETCH_POSTS, CREATE_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

//state = {} defaults the state to a javascript object
export default function(state = {}, action){
  switch (action.type) {
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state }; //...state takes the object in the current state and initializes a new object
      // newState[post.id] = post;
      // return newState;

      //ES6 way of writing above code
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      //action.payload.data is array of objs [post1, post2]
      //need to coerce it onto object type { id: post1, id: post2} done with the
      //help of lodash library. 'id' is the id key from the "post object"
      return _.mapKeys(action.payload.data,'id');
    case DELETE_POST:
      //using lodash we remove the deleted post from the app state and return a fresh object back to the
      //app state
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
