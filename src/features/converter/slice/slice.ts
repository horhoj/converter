import { createSlice } from '@reduxjs/toolkit';
import { CurrencyDataItem } from '../../../types/CurrencyDataItem';
import { SLICE_NAME } from './types';

interface InitialState {
  isLoading: boolean;
  currencyDataList: CurrencyDataItem[] | null;
}

const initialState: InitialState = {
  isLoading: false,
  currencyDataList: null,
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});
