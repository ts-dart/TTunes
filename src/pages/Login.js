import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_LIMIT_CHAR_NAME = 3;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      loading: '',
      name: '',
    };

    this.addUserByClickButton = this.addUserByClickButton.bind(this);
    this.validatorAndGetName = this.validatorAndGetName.bind(this);
  }

  validatorAndGetName({ target: { value } }) {
    this.setState({ name: value });

    if (value.length >= MIN_LIMIT_CHAR_NAME) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async addUserByClickButton() {
    const { name } = this.state;
    this.setState({ loading: true });

    const response = await createUser({ name });
    if (response === 'OK') {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      name,
      disabled,
      loading,
    } = this.state;

    return (
      <>
        <div data-testid="page-login">
          <label htmlFor="nameInput">
            Nome:
            <input
              type="text"
              id="nameInput"
              name={ name }
              value={ name }
              data-testid="login-name-input"
              onChange={ this.validatorAndGetName }
            />
            <button
              type="button"
              disabled={ disabled }
              onClick={ this.addUserByClickButton }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </label>
        </div>
        { loading ? <Loading /> : '' }
        { loading === false ? <Redirect to="/search" /> : '' }
      </>
    );
  }
}

export default Login;
