import { createReviewItemTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  async init({ reviewsContainer, reviews }) {
    this._reviewsContainer = reviewsContainer;
    this._reviews = reviews;
    await this._render();
  },

  async _render() {
    let html;
    this._reviews.forEach((review) => {
      html += createReviewItemTemplate(review);
    });

    this._reviewsContainer.innerHTML = html;
  },
};

export default ReviewInitiator;
