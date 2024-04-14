import {configureStore} from "@reduxjs/toolkit";

import {pagesSlice,  usersSlice} from './slices'

export const store = configureStore({
    reducer: {pages: pagesSlice, users: usersSlice},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true,
})