import {
  AnyAction,
  Store,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { PERSIST_KEY, PERSIST_VERSION } from "../lib/config";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage,
  whitelist: [],
};
const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefautMiddleware) =>
    getDefautMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PURGE, PAUSE, PERSIST, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
