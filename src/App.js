import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeScreen } from "./screens/HomeScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ContactScreen } from "./screens/ContactScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./store";
import DashboradScreen from "./screens/DashboradScreen";
import FetchAPIScreen from "./screens/FetchAPIScreen";
import LaptopRegistration  from "./screens/LaptopRegistration";
import ListLaptopScreen  from "./screens/ListLaptopScreen";


function App() {
  return (
    <Provider store={store}><div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/aboutscreen" element={<AboutScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/dashboard" element={<DashboradScreen></DashboradScreen>}>
            <Route path="laptopregister" element={<LaptopRegistration />} />
            <Route path="laptopList" element={<ListLaptopScreen />} />
            <Route path="laptopstats" element={<LaptopRegistration />} />
            </Route>
            <Route path="/fetchapi" element={<FetchAPIScreen />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
export default App;
