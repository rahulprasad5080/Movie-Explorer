import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
