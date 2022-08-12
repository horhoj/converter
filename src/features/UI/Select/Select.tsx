import { FC, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';
import { OptionItem } from './types';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionList: OptionItem[];
}

export const Select: FC<SelectProps> = ({ optionList, ...props }) => {
  return (
    <select className={styles.wrap} {...props}>
      {optionList.map((optionItem) => (
        <option key={optionItem.id} value={optionItem.value}>
          {optionItem.label}
        </option>
      ))}
    </select>
  );
};
