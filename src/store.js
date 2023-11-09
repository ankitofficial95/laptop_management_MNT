import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';   // slice for registration of a user
import authReducer from './slices/authSlice';                   // slice for login of a user
import userReducer from './slices/userSlice';                   // slice for users list (from API)
import laptopUserReducer from './slices/laptopRegisterSlice';   // slice for laptop user registration
import laptopReducer from './slices/laptopSlice';               // slice for laptop list

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    users: userReducer,
    laptopusers: laptopUserReducer,
    laptops: laptopReducer, 
  },
});

export default store;
