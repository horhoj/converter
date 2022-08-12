import { configureStore } from '@reduxjs/toolkit';
import { converterSlice } from '../features/converter/slice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    converter: converterSlice.reducer,
  },
});
