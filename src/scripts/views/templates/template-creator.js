import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
        <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name || '-'}"
            src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
        <div class="restaurant-item__header__rating">
            <p>⭐<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
        </div>
    </div>
    <div class="restaurant-item__content">
        <h3 class="restaurant__name"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name || '-'}</a></h3>
        <p>${restaurant.description || '-'}</p>
    </div>
  </div>
  `;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__name">${restaurant.name}</h2>
  <img class="restaurant__poster lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
    <div class="restaurant__categories">
      ${restaurant.categories.map((category) => `<div class="restaurant__categories__item"><p>${category.name}</p></div>`).join('')}
    </div>
    <h3>Information</h3>
    <h4>Rating</h4>
    <p>⭐${restaurant.rating}</p>

    <h4>Address</h4>
    <p>${restaurant.address}, ${restaurant.city}</p>

    <h4>Total Menu</h4>
    <p>${restaurant.menus.foods.length} food & ${restaurant.menus.drinks.length} drink</p>
  </div>

  <div class="restaurant__data">
    <div class="restaurant__description">
      <h3>Description</h3>
      <p>${restaurant.description}</p>
    </div>

    <div class="restaurant__menus">
      <div class="restaurant__menu">
        <h3>Foods</h3>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
      </div>

      <div class="restaurant__menu">
        <h3>Drinks</h3>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="restaurant__reviews">
      <h3>Reviews</h3>

      <div id="restaurantReviewForm" class="restaurant__review__form">
      </div>

      <ul id="restaurantReviewsContainer">
      </ul>
    </div>
  </div>
`;

const createReviewItemTemplate = (review) => `<li class="restaurant__reviews__item">
  <div class="review__data">
    <p class="review__name">${review.name}</p>
    <p class="review__date">${review.date}</p>
  </div>
  <p class="review__message">${review.review}</p>
</li>`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfavoritedButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createFormReviewTemplate = () => `
  <form id="formReview" class="form">
    <div class="form__group">
      <label for="reviewName">Name</label>
      <input type="text" class="form__control" id="reviewName" placeholder="Your name" name="name">
    </div>
    <div class="form__group">
      <label for="reviewMessage">Message</label>
      <textarea type="text" class="form__control form__control--area" id="reviewMessage" placeholder="Your review" name="review"></textarea>
    </div>

    <button type="submit" aria-label="button submit form review" class="btn btn--primary">Send Review</button>
  </form>
`;

const createLoadingTemplate = () => `
  <div class="lds-ring"><div></div><div></div><div></div><div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createReviewItemTemplate,
  createFavoriteButtonTemplate,
  createUnfavoritedButtonTemplate,
  createFormReviewTemplate,
  createLoadingTemplate,
};
