import React, { useState } from "react";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import {Provider} from "react-redux"
import appStore from "./Utlilites/appStore";
function App() {
  return (
    <>
    <Provider store = {appStore}>
            <Header />
            <Outlet/>
            <Footer />
      </Provider>
    </>
  );
}

export default App;
