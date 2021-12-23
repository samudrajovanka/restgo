import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import LoadingInitiator from '../../utils/loading-initiator';
import FavoriteResturantSearchPresenter from './favorited-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './favorited-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchView from './favorited-restaurants/favorite-restaurant-search-view';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');

    LoadingInitiator.init({
      loadingContainer: restaurantsContainer,
    });

    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteResturantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

    LoadingInitiator.finish();
  },
};

export default Favorite;
