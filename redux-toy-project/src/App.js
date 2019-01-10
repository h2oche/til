import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import PostForm from './components/PostForm';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PostForm/>
          <hr/>
          <Post/>
        </div>
      </Provider>
    );
  }
}

export default App;
