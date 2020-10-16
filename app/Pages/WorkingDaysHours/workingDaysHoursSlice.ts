import { createSlice } from '@reduxjs/toolkit';

const setWorkingDaysHoursSlice = createSlice({
  name: 'workingDaysHours',
  initialState: { workingDaysHours: {} },
  reducers: {
    setWorkingDaysHours: (state, action: any) => {
      state.workingDaysHours = action.payload;
    }
  }
});

export const { setWorkingDaysHours } = setWorkingDaysHoursSlice.actions;

export default setWorkingDaysHoursSlice.reducer;
