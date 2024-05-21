import React from 'react';
import ReactDOM from 'react-dom/client';
// import '../src/styles/index.scss';
import '../src/app/styles/index.scss';
import '../src/app/styles/cart.scss';
import '../src/app/styles/productCard.scss';
import '../src/app/styles/header.scss';
import '../src/app/styles/editProduct.scss';
import '../src/app/styles/categoryPannel.scss';
import '../src/app/styles/signUp.scss';
import '../src/app/styles/table.scss';
import './normalize.min.scss';

// import '../src/app/styles/tabs.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
