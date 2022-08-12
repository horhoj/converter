import { FC } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import styles from './Input.module.scss';

interface InputProps extends NumberFormatProps {}

export const Input: FC<InputProps> = ({ ...props }) => {
  return <NumberFormat className={styles.wrap} {...props} />;
};
