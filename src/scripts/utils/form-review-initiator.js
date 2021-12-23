import RestaurantDbSource from '../data/restaurant-source';
import { createFormReviewTemplate } from '../views/templates/template-creator';

const FormReviewInitiator = {
  async init({ formReviewContainer, idRestaurant }) {
    this._formReviewContainer = formReviewContainer;
    await this._render();
    this._idRestaurant = idRestaurant;
  },

  async _render() {
    this._formReviewContainer.innerHTML = createFormReviewTemplate();

    const formReview = document.querySelector('#formReview');

    formReview.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(formReview);
      const name = formData.get('name');
      const review = formData.get('review');

      const result = await RestaurantDbSource.reviewRestaurant(this._idRestaurant, name, review);

      if (!result.error) {
        alert('Review added');
        formReview.reset();
      } else {
        alert('Added review failed, try again');
      }
    });
  },
};

export default FormReviewInitiator;
