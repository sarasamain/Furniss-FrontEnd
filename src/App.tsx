import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./views/Login";
import Register from "./views/Register";
import NewProduct from "./views/NewProduct";
import UserGallery from "./views/UserGallery";
import Foot from "./views/Footer";
import ProductDetails from "./views/ProductDetails";
import Home from "./views/Home";
import "./App.css";
import CategoryPage from "./views/CategoryPage";
import Basket from "./views/Basket";
import SuccessfulPayment from "./views/SuccessfulPayment";
import PurchaseHistory from "./views/PurchaseHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "./ApiService/ApiService";
import SalesHistory from "./views/SalesHistory";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HIYqeHvILi8NO5PWxHkN04ZQxZcdDIxVUPh5nVfaQRMXC4UJiptUx4uWyCJHWfGfih2AhoSB4wgI2xKskMCECs800otDuHmjG"
);

type Props = {
  setUserData: (
    i: number,
    n: string,
    l: string,
    u: string,
    e: string,
    bd: string,
    g: string,
    a: string,
    ud: string,
    b: boolean
  ) => void;
};

function App({ setUserData }: Props): JSX.Element {
  const userToken = localStorage.getItem("accessToken");
  const userId: any = localStorage.getItem("userId");

  const getAllUserData = (userId: number) => {
    ApiService.getUserData(userId).then((res) => {
      setUserData(
        res.id,
        res.name,
        res.lastname,
        res.username,
        res.email,
        res.birthdate,
        res.gender,
        res.address,
        res.description,
        true
      );
    });
  };

  if (userToken && userId && userToken !== "undefined") {
    getAllUserData(userId);
  } else {
    localStorage.setItem("userId", "");
    localStorage.setItem("userToken", "");
  }

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="page">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/me">
              <UserGallery id="me" />
            </Route>
            <Route
              path="/usergallery/:id"
              render={({ match }) => <UserGallery id={match.params.id} />}
            ></Route>
            <Route path="/basket_products">
              <Basket isAuthenticated />
            </Route>
            <Route path="/successful_payment">
              <SuccessfulPayment />
            </Route>
            <Route path="/purchase_history">
              <PurchaseHistory isAuthenticated />
            </Route>
            <Route path="/sales_history">
              <SalesHistory isAuthenticated />
            </Route>
            <Route path={`/products`} component={CategoryPage} />
            <Route path="/productdetails">
              <ProductDetails isAuthenticated />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Foot />
      </Elements>
    </Router>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserData: (
      id: number,
      name: string,
      lastname: string,
      username: string,
      email: string,
      birthdate: string,
      gender: string,
      address: string,
      userDescription: string,
      isAuthenticated: boolean
    ) =>
      dispatch({
        type: "SET_USER_DATA",
        payload: {
          id,
          name,
          lastname,
          username,
          email,
          birthdate,
          gender,
          address,
          userDescription,
          isAuthenticated,
        },
      }),
  };
};

export default connect(null, mapDispatchToProps)(App);
