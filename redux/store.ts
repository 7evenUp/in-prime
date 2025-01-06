import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/modalReducer'
import { scrollReducer } from './reducers/scrollReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    scroll: scrollReducer.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
