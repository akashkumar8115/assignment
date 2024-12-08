// import { useDispatch, useSelector } from 'react-redux';
// // import type { RootState, AppDispatch } from './store';

// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch < AppDispatch > ();
// export const useAppSelector = useSelector < RootState >;

// 2nd way

import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
