import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/movie';

interface MovieState {
  list: Movie[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  list: [],
  searchQuery: '',
  loading: false,
  error: null,
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setMovies, setSearchQuery, setLoading, setError } =
  movieSlice.actions;
export default movieSlice.reducer;
