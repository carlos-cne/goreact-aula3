import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as FavoritesActions from '../../store/actions/favorites';

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
        }),
      ),
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.string, null]),
    }).isRequired,
  };

  state = {
    repositoryInput: '',
  };

  handleAddRepository = (e) => {
    const { addFavoriteRequest } = this.props;
    const { repositoryInput } = this.state;
    e.preventDefault();
    addFavoriteRequest(repositoryInput);
    this.setState({ repositoryInput: '' });
  };

  render() {
    const { repositoryInput } = this.state;
    const { favorites } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositorio"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>
          {favorites.loading && <span style={{ color: 'blue' }}>Carregando...</span>}
          {!!favorites.error && <span style={{ color: '#f00' }}>{favorites.error}</span>}
        </form>
        <ul>
          {favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> ({favorite.description})
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoritesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
