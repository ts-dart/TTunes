import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const {
      name,
      disabled,
      onClick,
      onChange,
    } = this.props;

    return (
      <div data-testid="page-login">
        <label htmlFor="nameInput">
          Nome:
          <input
            type="text"
            id="nameInput"
            name={ name }
            value={ name }
            data-testid="login-name-input"
            onChange={ onChange }
          />
          <button
            type="button"
            disabled={ disabled }
            onClick={ onClick }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Login;
