import RestaurantDbSource from '../data/restaurant-source';
import { createFormReviewTemplate, createReviewItemTemplate } from '../views/templates/template-creator';

const FormReviewInitiator = {
  async init({ formReviewContainer, reviewsContainer, idRestaurant }) {
    this._formReviewContainer = formReviewContainer;
    this._reviewsContainer = reviewsContainer;
    await this._render();
    this._idRestaurant = idRestaurant;
  },

  _addNewReview({ name, message }) {
    const dateObj = new Date();
    const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const date = `${dateObj.getDate()} ${month[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    this._reviewsContainer.innerHTML += createReviewItemTemplate({ name, review: message, date });
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
        this._addNewReview({ name, message: review });
        formReview.reset();
      } else {
        alert('Added review failed, try again');
      }
    });
  },
};

export default FormReviewInitiator;
