

import { createSlice } from '@reduxjs/toolkit';
import {UserBalance} from "@/app/types";
import {RootState} from "@/app/store";

const initialState: UserBalance = {
    balance: 100,
    isFrozen: false
};

export const userBalanceSlice = createSlice({
    name: 'userBalance',
    initialState,
    reducers: {
        changeBalance: (state, action) => {
            state.balance = action.payload;
        },
        frozeBalance: (state, action) => {
            state.isFrozen = action.payload;
        },

    },
});

export const {
    changeBalance,
    frozeBalance,
} = userBalanceSlice.actions;

export const selectBalance = (state: RootState) =>
    state.userBalance.balance;

export const selectIsFrozen = (state: RootState) =>
    state.userBalance.isFrozen;
