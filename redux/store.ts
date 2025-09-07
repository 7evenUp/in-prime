import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/modalReducer"
import { scrollReducer } from "./reducers/scrollReducer"
import { feautresReducer } from "./reducers/featuresReducer"

const store = configureStore({
  reducer: {
    auth: authReducer,
    scroll: scrollReducer.reducer,
    features: feautresReducer.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
