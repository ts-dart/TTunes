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
      image: './images/avatar.jpg',
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
            <div id='content-login-page'>
              {/* <img src="./images/art-login.svg" id='art' alt='art'/> */}
              <img
                id="ImgLoginScreen"
                // eslint-disable-next-line react/jsx-max-props-per-line
                src="./images/logo-music-ttnues.svg" alt="Imagem TTunes"
              />
              <img 
                id='art-page-login' 
                src='./images/undraw_happy_music_g6wc.svg'
                alt=''
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
            </div>
          )}
        { loading === false ? <Redirect to="/search" /> : '' }
      </>
    );
  }
}

export default Login;
