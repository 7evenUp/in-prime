import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FeaturesReducer {
  activeTab: string
}

const initialState: FeaturesReducer = {
  activeTab: "tab1",
}

export const feautresReducer = createSlice({
  name: "features",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload
    },
  },
})

export const { setActiveTab } = feautresReducer.actions
