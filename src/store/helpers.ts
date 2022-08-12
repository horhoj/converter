import { AxiosError } from 'axios';
import { RequestError } from './types';

export const getRequestErrorData = (e: unknown): RequestError => ({
  responseData: (e as AxiosError)?.response || null,
  errorMsg: (e as Error)?.message,
});
