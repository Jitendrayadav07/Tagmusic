import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Razorpay from "../src/components/Razorpay/Razorpay";
import AddOrg from "./components/AddOrg/AddOrg";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "semantic-ui-react";
import { Provider } from 'react-redux';
import store from "./app/store"

axios.defaults.baseURL = "http://localhost:8000/v1";
axios.default.withCredentials = true;

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/register" element={<Register />} />
              <Route path="/" exact element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="/" exact element={<Razorpay />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
