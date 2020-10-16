import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const setPoliciesSlice = createSlice({
  name: 'policies',
  initialState: { policies: [] },
  reducers: {
    setPolicies: (state, action: any) => {
      state.policies = action.payload;
    }
  }
});

export const { setPolicies } = setPoliciesSlice.actions;

export default setPoliciesSlice.reducer;

export const selectCount = (state: RootState) => state.policies.policies;
