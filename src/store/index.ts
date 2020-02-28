/* eslint-env browser */
/* global Raven, process*/
import * as history_ from 'history'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'

export const history =
  typeof window !== 'undefined'
    ? history_.createBrowserHistory()
    : history_.createMemoryHistory()

const rootReducer = combineReducers({
  ...reducers,
  form: reduxFormReducer,
  routing: routerReducer,
})

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware({
    onError: (e) => {
      if ((window as any).Raven && process.env.NODE_ENV === 'production') {
        ;(window as any).Raven.captureException(e)
      }
    },
  })
  const router = routerMiddleware(history)
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware, router)),
  )

  return {
    ...store,
    runSaga: sagaMiddleware.run(rootSaga),
  }
}

export default {
  configureStore,
}
