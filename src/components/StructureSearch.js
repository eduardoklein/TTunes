import React from 'react';

class StructureSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      artist: '',
    };
  }

  handleOnChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(() => ({ [name]: value }), () => {
      this.handleBtnDisabled();
    });
  };

  handleBtnDisabled = () => {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState(() => ({
        isBtnDisabled: false,
      }));
    } else {
      this.setState(() => ({
        isBtnDisabled: true,
      }));
    }
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div>
        <label htmlFor="artist">
          <input
            data-testid="search-artist-input"
            id="artist"
            name="artist"
            type="text"
            onChange={ this.handleOnChange }
          />
        </label>
        <button
          data-testid="search-artist-button"
          disabled={ isBtnDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default StructureSearch;
