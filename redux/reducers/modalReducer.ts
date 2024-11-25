import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IModalReducer {
  isLoginIDModal: boolean
  shouldRetryAuth: boolean
  isAuth: boolean
  boxesLeft: number | undefined
  boxesUsed: number | undefined
  userId: number | undefined
}

const initialState: IModalReducer = {
  isLoginIDModal: false,
  shouldRetryAuth: false,
  isAuth: false,
  boxesLeft: undefined,
  boxesUsed: undefined,
  userId: undefined,
}

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setLoginIDModal(state, action: PayloadAction<boolean>) {
      state.isLoginIDModal = action.payload
    },
    setShouldRetryAuth(state, action: PayloadAction<boolean>) {
      state.shouldRetryAuth = action.payload
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setBoxesLeft(state, action: PayloadAction<number>) {
      state.boxesLeft = action.payload
    },
    setBoxesUsed(state, action: PayloadAction<number>) {
      state.boxesUsed = action.payload
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload
    },
    incBoxesUsed(state) {
      state.boxesUsed = state.boxesUsed! + 1
    },
    decBoxesLeft(state) {
      state.boxesLeft = state.boxesLeft! - 1
    },
  },
})

export const {
  setLoginIDModal,
  setShouldRetryAuth,
  setAuth,
  setBoxesLeft,
  setBoxesUsed,
  setUserId,
  incBoxesUsed,
  decBoxesLeft,
} = modalReducer.actions

export default modalReducer.reducer
