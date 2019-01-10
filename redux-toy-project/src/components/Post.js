import React, { Component } from 'react';
// import axios from 'axios';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/postAction';
import PropTypes from 'prop-types';

class Post extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     posts: []
  //   }
  // }

  // componentWillMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  //     .then(res => this.setState({posts: res.data}));
  // }

  componentWillMount() {
    this.props.fetchPost();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )
    });

    return (
      <div>
        <h1>Post</h1>
        { postItems }
      </div>
    )
  }
}

Post.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
})

/* connect : map store's state to component's props */
export default connect(mapStateToProps, { fetchPost })(Post);