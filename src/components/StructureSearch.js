import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class StructureSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      artist: '',
      loading: false,
      searchedArtist: '',
      arrayResult: [],
      firstSearch: false,
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

  handleOnClick = async () => {
    const { artist } = this.state;
    this.setState(() => ({
      loading: true,
      searchedArtist: artist,
      firstSearch: true,
    }));
    const arrayObjResult = await searchAlbumsAPI(artist);
    console.log(arrayObjResult);
    this.setState(() => ({
      loading: false,
      arrayResult: arrayObjResult,
    }));
    this.setState(() => ({ artist: '' }), () => this.handleBtnDisabled());
  };

  render() {
    const {
      isBtnDisabled,
      artist,
      loading,
      searchedArtist,
      arrayResult,
      firstSearch,
    } = this.state;
    return (
      <div>
        { loading === true ? <p>Carregando...</p>
          : (
            <div>
              <label htmlFor="artist">
                <input
                  data-testid="search-artist-input"
                  id="artist"
                  name="artist"
                  type="search"
                  value={ artist }
                  onChange={ this.handleOnChange }
                />
              </label>
              <button
                data-testid="search-artist-button"
                disabled={ isBtnDisabled }
                onClick={ this.handleOnClick }
              >
                Pesquisar
              </button>
              {searchedArtist && (
                <p>
                  {`Resultado de álbuns de: ${searchedArtist}`}
                </p>
              )}
              { arrayResult.length === 0 && firstSearch
                ? <p>Nenhum álbum foi encontrado</p> : (
                  arrayResult.map((
                    { artworkUrl100, collectionName, artistName, collectionId },
                  ) => (
                    <div key={ collectionId }>
                      <img src={ artworkUrl100 } alt="capa de album" />
                      <p>{collectionName}</p>
                      <p>{artistName}</p>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        Ir para album
                      </Link>
                    </div>
                  ))
                ) }
            </div>
          )}
      </div>
    );
  }
}

export default StructureSearch;
