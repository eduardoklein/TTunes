import React from 'react';
import Header from './Header';
import StructureSearch from './StructureSearch';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <StructureSearch />
      </div>
    );
  }
}

export default Search;
