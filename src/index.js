import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import App from "./components/app";
import { store } from './store'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
          <Provider store={store}>
            <CSSReset />
            <App />
          </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
