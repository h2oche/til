import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPost} from '../actions/postAction';

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body
    };

    // axios.post('https://jsonplaceholder.typicode.com/posts', post)
    //   .then(res => console.log(res));
    this.props.createPost(post);
  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title : </label><br/>
            <input type="text" name="title" value={this.state.title} onChange={this.onChange}/>
          </div>
          <div>
            <label>Body : </label><br/>
            <textarea type="text" name="body" value={this.state.body} onChange={this.onChange}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
}

// export default PostForm
export default connect(null, {createPost})(PostForm);
