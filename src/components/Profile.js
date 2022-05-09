import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class ProfileComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      description: '',
      name: '',
      email: '',
      image: '',
    };

    this.receiveApiResponse = this.receiveApiResponse.bind(this);
  }

  componentDidMount() {
    this.receiveApiResponse();
  }

  async receiveApiResponse() {
    const response = await getUser();

    if (typeof response === 'object') {
      this.setState({
        loading: false,
        description: response.description,
        name: response.name,
        email: response.email,
        image: response.image,
      });
    }
  }

  render() {
    const {
      loading,
      description,
      name,
      email,
      image,
    } = this.state;

    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <h1>{ name }</h1>
              <h2>{ description }</h2>
              <h2>{ email }</h2>
              <img
                src={ image }
                alt="Imagem do usuario"
                data-testid="profile-image"
              />
              <Link to="/profile/edit">
                <button type="button">
                  Editar perfil
                </button>
              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileComponent;
