import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts/2')
      .then(respone => {
        if (!respone.ok) {
          throw Error(respone.status);
        }
        return respone.json();
      })
      .then(data => {
        this.setState({
          title: data.title,
          body: data.body
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;