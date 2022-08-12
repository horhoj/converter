import { createSlice } from '@reduxjs/toolkit';
import { CurrencyDataItem } from '../../../types/CurrencyDataItem';
import { getRequestErrorData } from '../../../store/helpers';
import { RequestError } from '../../../store/types';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isLoading: boolean;
  currencyDataList: CurrencyDataItem[] | null;
  requestError: RequestError | null;
}

const initialState: InitialState = {
  isLoading: false,
  currencyDataList: null,
  requestError: null,
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunks.fetchCurrencyDataList.pending, (state) => {
        state.isLoading = true;
        state.requestError = null;
        state.currencyDataList = null;
      })
      .addCase(thunks.fetchCurrencyDataList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currencyDataList = action.payload;
      })
      .addCase(thunks.fetchCurrencyDataList.rejected, (state, { error }) => {
        state.isLoading = false;
        state.requestError = getRequestErrorData(error);
      });
  },
});
