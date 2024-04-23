import React from 'react';
import ReactDOM from 'react-dom/client';
 import "@fortawesome/fontawesome-free/css/all.min.css"
 import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import TokenContextProvider from './Context/Token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
// import {ReactQueryDevtools} from "../node_modules/react-query/es/devtools/devtools" 
import reportWebVitals from './reportWebVitals';
import { QueryClient,QueryClientProvider } from 'react-query';
import CartContentProvider from './Context/CartContent.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query=new QueryClient()
root.render(
   <CartContentProvider>
 <QueryClientProvider client={query}>
    <TokenContextProvider>
    <App />
    </TokenContextProvider>
 </QueryClientProvider>
 </CartContentProvider>
  
   
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
