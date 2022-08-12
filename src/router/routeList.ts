import { FC } from 'react';
import { P404page } from '../pages/P404page';
import { ConverterPage } from '../pages/ConverterPage';

interface RouteItem {
  path: string;
  component: FC;
}

export const routeNameList = ['ConverterPage', 'Page404'] as const;

export type Routes = typeof routeNameList[number];

export const routeList: Record<Routes, RouteItem> = {
  ConverterPage: {
    path: '/',
    component: ConverterPage,
  },

  Page404: {
    path: '*',
    component: P404page,
  },
};
