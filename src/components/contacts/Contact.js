import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id_arg, dispatch_arg) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id_arg}`, {
        method: 'DELETE'
      });
      dispatch_arg({ type: 'DELETE_CONTACT', payload: id_arg });
    } catch (ex) {
      dispatch_arg({ type: 'DELETE_CONTACT', payload: id_arg });
    }
  };

  /* HTML RENDER || PLACEHOLDERS FOR DATA FROM PROPS ======>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  render() {
    const { id, name, email, phone } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                {/* Show/Hide icon */}
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fas fa-sort-down"
                />
                {/* DELETE ICON */}
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="far fa-edit"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: '#000',
                      marginRight: '.5em'
                    }}
                  />
                </Link>
              </h4>
              {/* Contact INFO */}
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default Contact;
