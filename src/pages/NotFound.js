import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../style/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-not-found" id="not-found">
          <img src="https://cdn.pixabay.com/photo/2022/05/14/18/06/18-06-04-255_960_720.jpg" alt="sad naruto" id="img" />
          <h1 id="txt">
            Parece que você esta perdido! a pagina que você procura não existe.
          </h1>
          <Link to="/search">
            <button type="button" className="btn btn-lg btn-success">
              Voltar a tela de pesquisa
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default NotFound;
