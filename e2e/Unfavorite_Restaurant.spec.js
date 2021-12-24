const assert = require('assert');

Feature('Unfavorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('unavorite one restaurant', async ({ I }) => {
  I.see('No restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const favoritedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);

  const firstRestaurantFavorite = locate('.restaurant__name a').first();
  I.click(firstRestaurantFavorite);

  I.seeElement('#unfavoriteButton');
  I.click('#unfavoriteButton');

  I.amOnPage('/#/favorite');
  I.see('No restaurant to show', '.restaurant-item__not__found');
});
