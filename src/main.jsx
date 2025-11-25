import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ProductProvider } from "./Context/ProductContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ProductProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductProvider>
    </Provider>
  </StrictMode>
);
