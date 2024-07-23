import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userBalanceSlice} from "@/app/utils/slices/userBalance";

import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch, useSelector,
} from 'react-redux';
import {UserBalance} from "@/app/types";
import {transactionsSlice, TransactionsState} from "@/app/utils/slices/commission";

const rootReducer = combineReducers({
    [userBalanceSlice.name]: userBalanceSlice.reducer,
    [transactionsSlice.name]: transactionsSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
})

export interface RootState {
    userBalance: UserBalance;
    transactions: TransactionsState;
}

export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
