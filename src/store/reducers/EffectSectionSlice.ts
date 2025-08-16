import { Pagination } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EffectSectionState {
    pagination: Pagination;
}

const initialState: EffectSectionState = {
    pagination: {
        page: 1,
        limit: 10,
        total: 1,
    },
};

const effectSectionSlice = createSlice({
    name: 'effectSection',
    initialState,
    reducers: {
        setPagination: (state, action: PayloadAction<Pagination>) => {
            state.pagination = action.payload;
        },
        resetPage: (state) => {
            state.pagination.page = 1;
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.pagination.total = action.payload;
        },
        prevPage: (state) => {
            if (state.pagination.page > 1) {
                state.pagination.page -= 1;
            }
        },
        nextPage: (state) => {
            if (state.pagination.page < state.pagination.total) {
                state.pagination.page += 1;
            }
        },
    },
});

export const { setPagination, prevPage, nextPage, setTotal, resetPage } = effectSectionSlice.actions;
export default effectSectionSlice.reducer;