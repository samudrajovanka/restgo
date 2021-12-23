const assert = require('assert');

Feature('Favorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('No restaurant to show', '.restaurant-item__not__found');
});

Scenario('favorite one restaurant', async ({ I }) => {
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
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('No restaurant to show', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');

  const names = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleFavoritedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleFavoritedRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__name').at(index + 1));
    assert.strictEqual(name, visibleTitle);
  });
});
