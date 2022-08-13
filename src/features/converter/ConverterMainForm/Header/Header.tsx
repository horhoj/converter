import { FC } from 'react';
import { CurrencyDataItem } from '../../../../types/CurrencyDataItem';
import styles from './Header.module.scss';

interface HeaderProps {
  currencyDataList: CurrencyDataItem[];
}

const FAVORITE = ['USD', 'EUR'] as const;

type FavoriteType = typeof FAVORITE[number];

const getFavoriteItemRate = (
  CC: FavoriteType,
  currencyDataList: CurrencyDataItem[],
): string => {
  const currencyDataItem = currencyDataList.find(
    (currencyDataItem) => currencyDataItem.cc === CC,
  );

  return currencyDataItem ? currencyDataItem.rate.toFixed(2).toString() : '_';
};

export const Header: FC<HeaderProps> = ({ currencyDataList }) => {
  return (
    <div className={styles.wrap}>
      {FAVORITE.map((favoriteItem) => (
        <div key={favoriteItem}>
          {favoriteItem} - {getFavoriteItemRate(favoriteItem, currencyDataList)}
        </div>
      ))}
    </div>
  );
};
