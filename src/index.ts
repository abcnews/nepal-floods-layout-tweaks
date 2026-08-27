import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App';
import './styles.scss';

let appMountEl: Mount;

function renderApp() {
  render(new App().el, appMountEl);
}

whenOdysseyLoaded.then(() => {
  [appMountEl] = selectMounts('nepalfloodslayouttweaks');

  if (appMountEl) {
    renderApp();
  }
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    try {
      renderApp();
    } catch (err) {}
  });
}

if (process.env.NODE_ENV === 'development') {
  console.debug(`[nepal-floods-layout-tweaks] public path: ${__webpack_public_path__}`);
}

function render(el: Element, parentEl: Element | null) {
  if (parentEl === null) {
    throw new Error('parentEl is not an Element');
  }

  while (parentEl.firstElementChild) {
    parentEl.removeChild(parentEl.firstElementChild);
  }

  parentEl.appendChild(el);
}
