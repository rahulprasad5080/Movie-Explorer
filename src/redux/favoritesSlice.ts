import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const exists = state.favorites.find(m => m.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          m => m.id !== action.payload.id,
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
