import { type ClassValue } from 'clsx';

export type CommonProps = {
  className?: ClassValue;
  children?: React.ReactNode;
};

export type CommonPropsWithoutChildren = Omit<CommonProps, 'children'>;
