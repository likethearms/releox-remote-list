// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import '../releox-remote-list.css';
import App from './App';

const initialState = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function todoApp(state = initialState, action: any) {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload;
    default:
      return state;
  }
}
const store = createStore(
  combineReducers({
    todoApp,
  }),
  composeWithDevTools()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
