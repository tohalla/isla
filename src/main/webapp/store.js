import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import DevTools from './DevTools';

import thunk from 'redux-thunk';

const production = () => {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk
    )
  )(createStore);
  return finalCreateStore(reducers);
};

const development = () => {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk
    ),
    DevTools.instrument()
  )(createStore);
  const store = finalCreateStore(reducers);
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(reducers)
    );
  }
  return store;
};

const store = process.env.NODE_ENV === 'production' ?
  production() : development();

export default store;
