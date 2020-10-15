import { createSlice } from '@reduxjs/toolkit';

const setInventorysSlice = createSlice({
  name: 'inventorys',
  initialState: {
    inventorys: {},
    existingInventory: false,
    editInventory: false,
    editingInventoryId: '',
    editingInventory: null
  },
  reducers: {
    setInventorys: (state, action: any) => {
      state.inventorys = action.payload;
    },
    setExistingInventory: (state, action: any) => {
      state.existingInventory = action.payload;
    },
    setEditInventory: (state, action: any) => {
      state.editInventory = action.payload;
    },
    setEditingInventoryId: (state, action: any) => {
      state.editingInventoryId = action.payload;
    },
    setEditingInventory: (state, action: any) => {
      state.editingInventory = action.payload;
    }
  }
});

export const { setInventorys } = setInventorysSlice.actions;
export const { setExistingInventory } = setInventorysSlice.actions;
export const { setEditInventory } = setInventorysSlice.actions;
export const { setEditingInventoryId } = setInventorysSlice.actions;
export const { setEditingInventory } = setInventorysSlice.actions;

export default setInventorysSlice.reducer;
