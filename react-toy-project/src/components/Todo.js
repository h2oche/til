import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todo extends Component {
  markComplete = () => {
    console.log('hello from todo');
  }

  render() {
    return this.props.todos.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo}/>
    });
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired
}

export default Todo;
