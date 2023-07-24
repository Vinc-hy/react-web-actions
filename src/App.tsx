import "./App.css";
import Router from "@/router/index";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
