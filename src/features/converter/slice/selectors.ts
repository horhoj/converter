import { RequestError, RootState } from '../../../store/types';
import { CurrencyDataItem } from '../../../types/CurrencyDataItem';

export const getIsLoading = (state: RootState): boolean =>
  state.converter.isLoading;

export const getCurrencyDataList = (
  state: RootState,
): CurrencyDataItem[] | null => state.converter.currencyDataList;

export const getRequestError = (state: RootState): RequestError | null =>
  state.converter.requestError;
