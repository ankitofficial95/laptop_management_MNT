import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const fetchLaptops = createAsyncThunk("laptops/fetchLaptops", async () => {
  try {
    const storedData = JSON.parse(localStorage.getItem("laptopRegistrations")) || [];
    return storedData;
  } catch (error) {
    throw error;
  }
});

export const editLaptopDetails = createAction("laptops/editLaptopDetails");

const laptopSlice = createSlice({
  name: "laptops",
  initialState: [],
  reducers: {
    removeLaptop: (state, action) => {
      const laptopId = action.payload;
      return state.filter((laptop) => laptop.lapSerialNumber !== laptopId);
    },

    editLaptop: (state, action) => {
      const { lapSerialNumber, lapName } = action.payload;
      return state.map((laptop) => {
        if (laptop.lapSerialNumber === lapSerialNumber) {
          return { ...laptop, lapName }; // Update only lapName
        }
        return laptop;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLaptops.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const laptopReducer = laptopSlice.reducer;
export const { removeLaptop , editLaptop } = laptopSlice.actions;
export default laptopReducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { getStoredLaptops } from "./localStorageUtil";


// const laptopSlice = createSlice({
//   name: "laptops",
//   initialState: getStoredLaptops(), 
//   reducers: {
//     fetchLaptops: (state, action) => {
//       return action.payload;
//     },

//     removeLaptop: (state, action) => {
//       const laptopId = action.payload;
//       return state.filter(laptop => laptop.lapSerialNumber !== laptopId);
//     },
//   },
// });

// export const { fetchLaptops, removeLaptop } = laptopSlice.actions;
// export default laptopSlice.reducer;
