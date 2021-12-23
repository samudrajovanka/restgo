import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import FormReviewInitiator from '../../utils/form-review-initiator';
import LoadingInitiator from '../../utils/loading-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import ReviewInitiator from '../../utils/review-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="favoriteButtonContainer"></div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');

    LoadingInitiator.init({
      loadingContainer: restaurantContainer,
    });

    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);

    LoadingInitiator.finish();

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    FavoriteButtonPresenter.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
      },
    });

    const reviewsContainer = document.querySelector('#restaurantReviewsContainer');

    FormReviewInitiator.init({
      formReviewContainer: document.querySelector('#restaurantReviewForm'),
      reviewsContainer,
      idRestaurant: restaurant.id,
    });

    ReviewInitiator.init({
      reviewsContainer,
      reviews: restaurant.customerReviews,
    });
  },
};

export default Detail;
