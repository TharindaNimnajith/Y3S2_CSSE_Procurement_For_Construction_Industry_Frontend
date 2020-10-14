import { createSlice } from '@reduxjs/toolkit';

const purchaseOrdersForApprovingSlice = createSlice({
  name: 'purchaseOrdersForApproving',
  initialState: {
    orders: {}
  },
  reducers: {
    setOrders: (state, action: any) => {
      state.orders = action.payload;
    }
  }
});

export const { setOrders } = purchaseOrdersForApprovingSlice.actions;

export default purchaseOrdersForApprovingSlice.reducer;
