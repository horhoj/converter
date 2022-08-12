import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { converterSlice } from '../slice';
import styles from './ConverterMainForm.module.scss';

export const ConverterMainForm: FC = () => {
  const dispatch = useAppDispatch();
  const currencyDataList = useAppSelector(
    converterSlice.selectors.getCurrencyDataList,
  );

  useEffect(() => {
    dispatch(converterSlice.thunks.fetchCurrencyDataList());
  }, []);
  return (
    <div className={styles.wrap}>
      <div>ConverterMainForm</div>
      <pre>{JSON.stringify(currencyDataList, null, 2)}</pre>
    </div>
  );
};
