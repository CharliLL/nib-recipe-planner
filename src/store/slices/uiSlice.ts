import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  isRecipeModalOpen: boolean;
  isShoppingListModalOpen: boolean;
  successMessage: string | null;
}

const initialState: UiState = {
  isRecipeModalOpen: false,
  isShoppingListModalOpen: false,
  successMessage: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openRecipeModal(state) {
      state.isRecipeModalOpen = true;
    },
    closeRecipeModal(state) {
      state.isRecipeModalOpen = false;
    },
    openShoppingListModal(state) {
      state.isShoppingListModalOpen = true;
    },
    closeShoppingListModal(state) {
      state.isShoppingListModalOpen = false;
    },
    setSuccessMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
});

export const {
  openRecipeModal,
  closeRecipeModal,
  openShoppingListModal,
  closeShoppingListModal,
  setSuccessMessage,
  clearSuccessMessage,
} = uiSlice.actions;

export default uiSlice.reducer;
