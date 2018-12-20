import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

/*  */
class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    /* GET ID FROM THE URL ADDRESS */
    const { id } = this.props.match.params;
    const resp = await (await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )).json();

    this.setState({
      name: resp.name,
      email: resp.email,
      phone: resp.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //=========================Validation=============================================
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    /* GET ID FROM URL TO MAKE A PUT REQUEST  */
    const { id } = this.props.match.params;

    const updateContact = {
      name,
      email,
      phone
    };

    const resp = await (await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updateContact)
      }
    )).json();

    dispatch({ type: 'UPDATE_CONTACT', payload: resp });

    //Clear INPUT FIELDS ONCE CONTACT ADDED
    this.setState({ name: '', email: '', phone: '', errors: {} });

    //REDITECT ONCE SUBMITTED
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  {/* FILL FORM-INPUT  WITH SOME DATA  */}
                  <TextInputGroup
                    label="Name"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
