import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../style/profile.css';

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
      <div className="display">
        { loading
          ? <Loading typeLoadingClass={'loading-position-center-color-green'}/>
          : (
            <div className="album-display">
              <div className="names-id">
                <h1 className="txt">Perfil</h1>
              </div>
              <div className="contentProfile">
                <img
                  src={ image }
                  alt="Imagem do usuario"
                  data-testid="profile-image"
                  id="user-image"
                />
                <div id="user-data">
                  Nome:
                  <p>{ name }</p>
                  Descrição:
                  <p>{ description }</p>
                  Email:
                  <p>{ email }</p>
                  <Link to="/profile/edit">
                    <button type="button" className="btn btn-lg btn-success">
                      Editar perfil
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileComponent;
