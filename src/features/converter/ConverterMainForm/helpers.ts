import { CurrencyDataItem } from '../../../types/CurrencyDataItem';
import { OptionItem } from '../../UI/Select/types';
import { THOUSAND_SEPARATOR } from '../config';

export const getCurrencyList = (
  currencyDataList: CurrencyDataItem[],
): OptionItem[] => {
  const result: OptionItem[] = [];

  currencyDataList.forEach((currencyDataItem, index) => {
    const optionItem: OptionItem = {
      id: index,
      label: `${currencyDataItem.cc} - ${currencyDataItem.txt}`,
      value: currencyDataItem.cc,
    };
    result.push(optionItem);
  });

  return result;
};

export const getConvertedValue = (
  mainUnits: string,
  mainType: string,
  resultType: string,
  currencyDataList: CurrencyDataItem[],
): string => {
  const mainUnitsFloat = Number.parseFloat(
    mainUnits.split(THOUSAND_SEPARATOR).join(''),
  );

  const mainCurrencyDataItem = currencyDataList.find(
    (currencyDataItem) => currencyDataItem.cc === mainType,
  );

  const resultCurrencyDataItem = currencyDataList.find(
    (currencyDataItem) => currencyDataItem.cc === resultType,
  );

  if (
    mainCurrencyDataItem &&
    resultCurrencyDataItem &&
    !Number.isNaN(mainUnitsFloat)
  ) {
    const value =
      (mainUnitsFloat * mainCurrencyDataItem.rate) /
      resultCurrencyDataItem.rate;

    return value.toFixed(2).toString();
  }

  return '';
};
