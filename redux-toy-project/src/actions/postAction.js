import { FETCH_POSTS, NEW_POST} from './types';
import axios from 'axios';
// export function fetchPosts() {
//   return function(dispatch) {
//     axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
//       .then(res => dispatch({
//         type: FETCH_POSTS,
//         payload: res.data
//       }));
//   }
// }

export const fetchPost = () => dispatch => {
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(res => dispatch({
      type: FETCH_POSTS,
      payload: res.data
    }));
}

export const createPost = (postData) => dispatch => {
  // axios.post('https://jsonplaceholder.typicode.com/posts', post)
  //     .then(res => console.log(res));

  axios.post('https://jsonplaceholder.typicode.com/posts', postData)
    .then(res => dispatch({
      type: NEW_POST,
      payload: res.data
    }));
}