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
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const index = state.favorites.findIndex(m => m.id === movie.id);

      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movie);
      }
    },
    clearFavorites: state => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
