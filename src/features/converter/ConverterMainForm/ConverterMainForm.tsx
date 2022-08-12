import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { converterSlice } from '../slice';
import { Select } from '../../UI/Select';
import { Input } from '../../UI/Input';
import { OptionItem } from '../../UI/Select/types';
import { DECIMAL_SCALE, THOUSAND_SEPARATOR } from '../config';
import styles from './ConverterMainForm.module.scss';
import { getConvertedValue, getCurrencyList } from './helpers';

export const ConverterMainForm: FC = () => {
  const dispatch = useAppDispatch();
  const currencyDataList = useAppSelector(
    converterSlice.selectors.getCurrencyDataList,
  );
  const isLoading = useAppSelector(converterSlice.selectors.getIsLoading);
  const requestError = useAppSelector(converterSlice.selectors.getRequestError);
  const [primaryUnits, setPrimaryUnits] = useState<string>('0');
  const [primaryType, setPrimaryType] = useState<string>('');
  const [secondaryUnits, setSecondaryUnits] = useState<string>('0');
  const [secondaryType, setSecondaryType] = useState<string>('');

  useEffect(() => {
    //загружаем данные по валютам
    dispatch(converterSlice.thunks.fetchCurrencyDataList());
  }, []);

  useEffect(() => {
    //после того как данные по валютам будут загружены
    //мы установим в качестве валюты по умолчанию самую первую из списка доступных валют
    if (currencyDataList) {
      const defaultType = currencyDataList[0];
      if (defaultType) {
        setPrimaryType(defaultType.cc);
        setSecondaryType(defaultType.cc);
      }
    }
  }, [currencyDataList]);

  if (isLoading) {
    return <div>Идет загрузка данных по валютам</div>;
  }

  if (requestError) {
    return (
      <div>Не удалось загрузить данные по валютам {requestError.errorMsg}</div>
    );
  }

  if (currencyDataList === null) {
    return null;
  }

  const currencyList: OptionItem[] = getCurrencyList(currencyDataList);

  const handlePrimaryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrimaryUnits(e.target.value);
    const convertedValue = getConvertedValue(
      e.target.value,
      primaryType,
      secondaryType,
      currencyDataList,
    );
    setSecondaryUnits(convertedValue);
  };

  const handlePrimarySelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPrimaryType(e.target.value);
    const convertedValue = getConvertedValue(
      primaryUnits,
      e.target.value,
      secondaryType,
      currencyDataList,
    );
    setSecondaryUnits(convertedValue);
  };

  const handleSecondaryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondaryUnits(e.target.value);
    const convertedValue = getConvertedValue(
      e.target.value,
      secondaryType,
      primaryType,
      currencyDataList,
    );
    setPrimaryUnits(convertedValue);
  };

  const handleSecondarySelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSecondaryType(e.target.value);
    const convertedValue = getConvertedValue(
      secondaryUnits,
      e.target.value,
      primaryType,
      currencyDataList,
    );
    setPrimaryUnits(convertedValue);
  };

  return (
    <div className={styles.wrap}>
      <div>ConverterMainForm</div>
      <div>
        <Input
          value={primaryUnits}
          onChange={handlePrimaryInputChange}
          decimalScale={DECIMAL_SCALE}
          thousandSeparator={THOUSAND_SEPARATOR}
        />{' '}
        <Select
          optionList={currencyList}
          value={primaryType}
          onChange={handlePrimarySelectChange}
        />
      </div>
      <div>
        <Input
          value={secondaryUnits}
          onChange={handleSecondaryInputChange}
          decimalScale={DECIMAL_SCALE}
          thousandSeparator={THOUSAND_SEPARATOR}
        />{' '}
        <Select
          optionList={currencyList}
          value={secondaryType}
          onChange={handleSecondarySelectChange}
        />
      </div>
      <pre>{JSON.stringify(currencyDataList, null, 2)}</pre>
    </div>
  );
};
