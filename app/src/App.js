import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  HomePage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="Routes">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crypto Pulse <br />
            My other projects below!
          </Typography.Title>
          <Space>
            <a
              href="https://elitepay.onrender.com/"
              target={" _blank"}
              rel="noopener noreferrer"
            >
              ElitePay
            </a>
            <a
              href="https://pixelpeek.onrender.com/"
              target={" _blank"}
              rel="noopener noreferrer"
            >
              PixelPeek
            </a>
            <a
              href="https://skybnb-jl.onrender.com/"
              target={" _blank"}
              rel="noopener noreferrer"
            >
              Skybnb
            </a>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
