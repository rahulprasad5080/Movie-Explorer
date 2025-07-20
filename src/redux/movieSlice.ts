import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/movie';

interface MovieState {
  list: Movie[];
  searchQuery: string;
}

const initialState: MovieState = {
  list: [],
  searchQuery: '',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<Movie[]>) {
      state.list = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setMovies, setSearchQuery } = movieSlice.actions;
export default movieSlice.reducer;
