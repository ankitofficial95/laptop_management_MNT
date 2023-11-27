import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeScreen } from "./screens/HomeScreen";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import RegistrationScreen from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { Provider } from "react-redux";
import store from "./store";
import DashboradScreen from "./screens/DashboradScreen";
import LaptopRegistration  from "./screens/LaptopRegistration";
import ListLaptopScreen  from "./screens/ListLaptopScreen";
import { RepairHistory } from "./screens/RepairHistory";
import { LaptopDetailsScreen } from "./screens/LaptopDetailsScreen";
import { LaptopStatsScreen } from "./screens/LaptopStatsScreen";


function App() {
  return (
    <Provider store={store}><div className="App">
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/dashboard" element={<DashboradScreen></DashboradScreen>}>
                  <Route path="laptopregister" element={<LaptopRegistration />} />
                  <Route path="laptopList" element={<ListLaptopScreen />} />
                  <Route path="repairHistory" element={<RepairHistory />} />
                  <Route path="laptopList/edit/:id" element={<LaptopDetailsScreen />} />
                  <Route path="laptopstats" element={<LaptopStatsScreen />} />
            </Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
export default App;
