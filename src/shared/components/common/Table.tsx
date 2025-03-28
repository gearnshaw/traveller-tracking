import React from 'react';
import { ViewProps } from 'react-native';
import { Card } from '../base/Card';

export type TableProps = ViewProps & {
  children: React.ReactNode;
};

export const Table = ({ children, style, ...props }: TableProps) => {
  return (
    <Card style={style} {...props}>
      {children}
    </Card>
  );
};
