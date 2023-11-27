import { createSlice } from '@reduxjs/toolkit';

const laptopEditSlice = createSlice({
  name: 'laptopEdit',
  initialState: null, 
  reducers: {
    setLaptopToEdit: (state, action) => {
      return action.payload; 
    },
    clearLaptopEdit: (state) => {
      return null;
    },
  },
});

export const { setLaptopToEdit, clearLaptopEdit } = laptopEditSlice.actions;
export default laptopEditSlice.reducer;
