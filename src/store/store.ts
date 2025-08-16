import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { waysService } from '@/api/waysService';
import { usersService } from '@/api/usersService';
import effectSectionReducer from './reducers/EffectSectionSlice';

const rootReducer = combineReducers({
    effectSectionReducer,
    [waysService.reducerPath]: waysService.reducer,
    [usersService.reducerPath]: usersService.reducer,
});

const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                waysService.middleware,
                usersService.middleware
            ),
    });

export default setupStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
