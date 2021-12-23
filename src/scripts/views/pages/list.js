import RestaurantDbSource from '../../data/restaurant-source';
import LoadingInitiator from '../../utils/loading-initiator';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const List = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Restaurant List</h2>
        <div id="restaurants" class="restaurants">
  
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');

    LoadingInitiator.init({
      loadingContainer: restaurantsContainer,
    });

    const restaurants = await RestaurantDbSource.list();

    LoadingInitiator.finish();

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default List;
