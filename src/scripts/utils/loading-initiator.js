import { createLoadingTemplate } from '../views/templates/template-creator';

const LoadingInitiator = {
  init({ loadingContainer }) {
    this._loadingContainer = loadingContainer;
    this._renderLoading();
  },

  _renderLoading() {
    this._loadingContainer.innerHTML = createLoadingTemplate();
  },

  finish() {
    this._loadingContainer.innerHTML = '';
  },
};

export default LoadingInitiator;
