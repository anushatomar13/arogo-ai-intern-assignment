import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store"; 


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>  
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
