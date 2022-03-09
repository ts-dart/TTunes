import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/Search';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchForm />
      </div>
    );
  }
}

export default Search;
