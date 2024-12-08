// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './features/booksSlice';
// import { store } from './app/store';
// import App from './App';
// import './index.css';

// const store = configureStore({
//   reducer: {
//     books: booksReducer,
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
