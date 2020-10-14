import { createSlice } from '@reduxjs/toolkit';

const setInventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    inventory: null,
    existingInventory: false,
    editInventory: false,
    editingInventoryId: '',
    editingInventory: null
  },
  reducers: {
    setInventory: (state, action: any) => {
      state.inventory = action.payload;
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

export const { setInventory } = setInventorySlice.actions;
export const { setExistingInventory } = setInventorySlice.actions;
export const { setEditInventory } = setInventorySlice.actions;
export const { setEditingInventoryId } = setInventorySlice.actions;
export const { setEditingInventory } = setInventorySlice.actions;

export default setInventorySlice.reducer;
