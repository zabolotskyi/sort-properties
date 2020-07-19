import { configureStore } from '@reduxjs/toolkit';

import propertiesSortReducer from '../features/properties/propertiesSlice';

export const store = configureStore({
  reducer: {
    propertiesSort: propertiesSortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
