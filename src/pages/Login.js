import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/login.css';

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

    const response = await createUser({
      name,
      email: 'Preencha seu email',
      image: 'https://cdn.pixabay.com/photo/2022/05/11/22/11/icon-7190310_960_720.jpg',
      description: 'Preencha sua descrição',
    });

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
        {loading
          ? <Loading />
          : (
            <>
              <img
                id="ImgLoginScreen"
                // eslint-disable-next-line react/jsx-max-props-per-line
                src="https://cdn.pixabay.com/photo/2022/05/11/01/11/music-7188266_960_720.jpg" alt="Imagem TTunes"
              />
              <div data-testid="page-login" id="form">
                <label htmlFor="nameInput" id="nameLabel">
                  Nome:
                  <input
                    type="text"
                    id="nameInput"
                    name={ name }
                    value={ name }
                    data-testid="login-name-input"
                    onChange={ this.validatorAndGetName }
                    className="form-control"
                  />
                </label>
                <button
                  type="button"
                  disabled={ disabled }
                  onClick={ this.addUserByClickButton }
                  data-testid="login-submit-button"
                  className="btn btn-lg btn-success"
                  id="button"
                >
                  Entrar
                </button>
              </div>
            </>
          )}
        { loading === false ? <Redirect to="/search" /> : '' }
      </>
    );
  }
}

export default Login;
