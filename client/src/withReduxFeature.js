import { combineReducer, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise-middleware";
import withProvider from "./withProvider";
import rootReducer from "./redux/reducers";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promise))
);

export default withProvider({ store, Provider });
