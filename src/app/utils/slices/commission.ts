import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/app/store";

export interface TransactionsState {
    commissionTransactions: number;
}

const initialState: TransactionsState = {
    commissionTransactions: 0,
};

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        incrementCommissionTransactions(state) {
            state.commissionTransactions += 1;
        },
    },
});

export const {
    incrementCommissionTransactions,
} = transactionsSlice.actions;

export const selectCommissionTransactions = (state: RootState) =>
    state.transactions.commissionTransactions;

