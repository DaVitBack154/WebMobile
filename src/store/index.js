import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AccountReducer from './AccoutReducer';

// const { composeWithDevTools } = require('redux-devtools-extension');

const rootReducer = combineReducers({
  account: AccountReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: composeWithDevTools,
});

export const persistor = persistStore(store);
export default store;
