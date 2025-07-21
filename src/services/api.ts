import axios from 'axios';
import { Movie } from '../types/movie';

const API_KEY = 'bb3c29d0b09be163d60336897e591001';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};
