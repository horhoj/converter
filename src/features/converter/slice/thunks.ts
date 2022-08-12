import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';
import { CurrencyDataItem } from '../../../types/CurrencyDataItem';
import { SLICE_NAME } from './types';

export const fetchCurrencyDataList = createAsyncThunk(
  `${SLICE_NAME}/fetchCurrencyDataList}`,
  async () => {
    const requestConfig: AxiosRequestConfig = {
      url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
      method: 'get',
    };

    const response = await axios.request<CurrencyDataItem[]>(requestConfig);
    return response.data;
  },
);
