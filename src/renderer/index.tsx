import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept();

  // module.hot.accept('./components/App', () => {
  //    // If we receive a HMR request for our App container,
  //    // then reload it using require (we can't do this dynamically with import)
  //    const NextApp = require('./components/App').default;

  //    // And render it into the root element again
  //    render(NextApp);
  // });
}
