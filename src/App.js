import React from "react";

// react router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import {
  About, Cart, Checkout, Error, Home, Login, Products, ProductDetails,
} from "./pages";

// components
import Header from "./components/Header";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <PrivateRoute exact path="/checkout">
          <Checkout />
        </PrivateRoute>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route path="/products/:id" children={<ProductDetails />}></Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
