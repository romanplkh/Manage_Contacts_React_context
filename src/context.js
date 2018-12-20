import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(reducer(this.state, action));
    }
  };

  async componentDidMount() {
    const resp = await (await fetch(
      'https://jsonplaceholder.typicode.com/users'
    )).json();

    this.setState({ contacts: resp });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children} {/* value */}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
