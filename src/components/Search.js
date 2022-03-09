import React from 'react';

const MIN_LIMIT_CHAR_NAME = 2;

class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      disabled: true,
    };

    this.validatorArtist = this.validatorArtist.bind(this);
  }

  validatorArtist({ target: { value } }) {
    this.setState({ artist: value });

    if (value.length >= MIN_LIMIT_CHAR_NAME) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState(() => ({
        disabled: true,
      }));
    }
  }

  render() {
    const {
      disabled,
      artist,
    } = this.state;

    return (
      <form>
        <input
          name={ artist }
          value={ artist }
          data-testid="search-artist-input"
          onChange={ this.validatorArtist }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchForm;
