import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      able: true,
      loading: true,
      description: '',
      name: '',
      email: '',
      image: '',
    };
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser = async () => {
    const response = await getUser();

    if (typeof response === 'object') {
      this.setState({
        loading: false,
        description: response.description,
        name: response.name,
        email: response.email,
        image: response.image,
      }, () => this.ableButton());
    }
  }

  modUser = () => {
    const {
      description,
      name,
      email,
      image,
    } = this.state;

    const userData = {
      description,
      email,
      image,
      name,
    };

    updateUser(userData);
  }

  handlerForm = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.ableButton());
  }

  validEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(regex)) return true;
    return false;
  }

  ableButton = () => {
    const { state, state: { email } } = this;
    const states = Object.values(state);
    const inputs = states.filter((curr) => curr !== true && curr !== false);
    const bool = inputs.every((curr) => curr.length > 0);

    if (bool && this.validEmail(email)) this.setState({ able: false });
    else this.setState({ able: true });
  }

  render() {
    const {
      able,
      loading,
      description,
      name,
      email,
      image,
    } = this.state;

    return (
      <div>
        <Header />
        { loading
          ? <Loading />
          : (
            <div data-testid="page-profile-edit">
              <div>
                <input
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ (event) => this.handlerForm(event) }
                />
                <input
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ (event) => this.handlerForm(event) }
                />
                <input
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ (event) => this.handlerForm(event) }
                />
                <input
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ (event) => this.handlerForm(event) }
                />
                <Link to="/profile">
                  <button
                    type="button"
                    data-testid="edit-button-save"
                    disabled={ able }
                    onClick={ this.modUser }
                  >
                    CLICK
                  </button>
                </Link>
              </div>
            </div>
          ) }
      </div>
    );
  }
}

export default ProfileEdit;
